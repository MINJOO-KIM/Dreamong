package com.ssafy.dreamong.domain.entity.dream.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dreamong.domain.entity.category.Category;
import com.ssafy.dreamong.domain.entity.category.Type;
import com.ssafy.dreamong.domain.entity.category.repository.CategoryRepository;
import com.ssafy.dreamong.domain.entity.dream.Dream;
import com.ssafy.dreamong.domain.entity.dream.dto.*;
import com.ssafy.dreamong.domain.entity.dream.repository.DreamRepository;
import com.ssafy.dreamong.domain.entity.dreamcategory.DreamCategory;
import com.ssafy.dreamong.domain.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DreamService {

    private final DreamRepository dreamRepository;
    private final CategoryRepository categoryRepository;
    private final ChatModel chatModel;
    private final ObjectMapper objectMapper; // Jackson ObjectMapper를 사용하여 JSON 파싱

    // 꿈 생성
    @Transactional
    public DreamDto create(DreamCreateRequest dreamRequest) {
        // AI API 호출하여 summary 생성
        String newSummary = SingleLineInterpretation(dreamRequest.getContent());

        // AI API 호출하여 category 분석
        String detailedPrompt = DetailedPrompt(dreamRequest.getContent());
        String analysisResultJson = chatModel.call(detailedPrompt);

        List<DreamCategoryDto> dreamCategoryDto = parseDreamCategories(analysisResultJson);

        Dream dream = Dream.builder()
                .content(dreamRequest.getContent())
                .image(dreamRequest.getImage())
                .interpretation(dreamRequest.getInterpretation())
                .summary(newSummary)
                .isShared(false)
                .likesCount(0)
                .userId(dreamRequest.getUserId())
                .writeTime(dreamRequest.getWriteTime())
                .build();

        dream = dreamRepository.save(dream);

        List<DreamCategory> dreamCategories = new ArrayList<>();
        for (DreamCategoryDto dto : dreamCategoryDto) {
            Category category = categoryRepository.findByWordAndType(dto.getCategoryWord(), Type.valueOf(dto.getCategoryType()))
                    .orElseGet(() -> categoryRepository.save(new Category(dto.getCategoryWord(), Type.valueOf(dto.getCategoryType()))));
            DreamCategory dreamCategory = new DreamCategory(dream, category);
            dreamCategories.add(dreamCategory);
        }

        dream.getDreamCategories().addAll(dreamCategories);
        dream = dreamRepository.save(dream);

        return toDreamDto(dream);
    }

    // 상세보기
    public DreamGetResponse getDream(Integer dreamId) {
        Dream dream = dreamRepository.findById(dreamId).orElseThrow(() -> new NotFoundException("Dream not found"));

        return new DreamGetResponse(
                dream.getContent(),
                dream.getImage(),
                dream.getInterpretation(),
                dream.getSummary(),
                dream.isShared(),
                dream.getLikesCount(),
                dream.getWriteTime()
        );
    }

    // 메인 조회
    public List<DreamMainResponse> getDreamsByUserIdAndWriteTime(Integer userId, String writeTime) {
        // 날짜를 파싱하여 연도와 월을 추출합니다.
        LocalDate date = LocalDate.parse(writeTime, DateTimeFormatter.ofPattern("yyyyMMdd"));
        String yearMonth = date.format(DateTimeFormatter.ofPattern("yyyyMM"));

        List<Dream> dreams = dreamRepository.findAllByUserIdAndWriteTimeLikeOrderByWriteTimeDesc(userId, yearMonth);

        if (dreams.isEmpty()) {
            return new ArrayList<>();
        }

        List<DreamMainResponse> dreamMainResponseList = new ArrayList<>();
        for (Dream dream : dreams) {
            DreamMainResponse response = new DreamMainResponse(
                    dream.getContent(),
                    dream.getImage(),
                    dream.getWriteTime()
            );
            dreamMainResponseList.add(response);
        }
        return dreamMainResponseList;
    }

    // 꿈 수정
    @Transactional
    public DreamDto update(Integer dreamId, DreamUpdateRequest dreamUpdateRequest) {
        Dream existingDream = dreamRepository.findById(dreamId).orElseThrow(() -> new NotFoundException("Dream not found"));

        // AI API 호출하여 summary 생성
        String newSummary = SingleLineInterpretation(dreamUpdateRequest.getContent());

        // AI API 호출하여 category 분석
        String detailedPrompt = DetailedPrompt(dreamUpdateRequest.getContent());
        String analysisResultJson = chatModel.call(detailedPrompt);
        List<DreamCategoryDto> dreamCategoryDtos = parseDreamCategories(analysisResultJson);

        // 기존 카테고리 삭제
        existingDream.getDreamCategories().clear();
        dreamRepository.save(existingDream); // 업데이트된 상태를 먼저 저장

        // 새로운 카테고리 추가
        List<DreamCategory> newDreamCategories = new ArrayList<>();
        for (DreamCategoryDto dto : dreamCategoryDtos) {
            Category category = categoryRepository.findByWordAndType(dto.getCategoryWord(), Type.valueOf(dto.getCategoryType()))
                    .orElseGet(() -> categoryRepository.save(new Category(dto.getCategoryWord(), Type.valueOf(dto.getCategoryType()))));
            DreamCategory dreamCategory = new DreamCategory(existingDream, category);
            newDreamCategories.add(dreamCategory);
        }

        existingDream.getDreamCategories().addAll(newDreamCategories);

        // Dream 객체 업데이트
        existingDream.update(
                dreamUpdateRequest.getContent(),
                dreamUpdateRequest.getImage(),
                dreamUpdateRequest.getInterpretation(),
                newSummary, // 새로운 summary 사용
                dreamUpdateRequest.getWriteTime(),
                dreamUpdateRequest.isShared(),
                newDreamCategories
        );

        return toDreamDto(dreamRepository.save(existingDream));
    }

    // 꿈 삭제
    @Transactional
    public boolean deleteDream(Integer dreamId) {
        Dream dream = dreamRepository.findById(dreamId).orElseThrow(() -> new NotFoundException("Dream not found"));
        dreamRepository.delete(dream);
        return true;
    }

    // 꿈 임시저장
    @Transactional
    public DreamDto createTemporaryDream(DreamCreateRequest dreamCreateRequest) {
        Dream dream = Dream.builder()
                .content(dreamCreateRequest.getContent())
                .image(dreamCreateRequest.getImage())
                .interpretation(dreamCreateRequest.getInterpretation())
                .summary("")
                .isShared(false)
                .likesCount(0)
                .userId(dreamCreateRequest.getUserId())
                .writeTime(dreamCreateRequest.getWriteTime())
                .dreamCategories(new ArrayList<>())
                .build();

        dream = dreamRepository.save(dream);
        return toDreamDto(dream);
    }

    // 한줄 요약
    private String SingleLineInterpretation(String message) {
        // 프롬프트 작성 로직
        String prompt = "사용자가 꾼 꿈의 내용은 다음과 같습니다: \"" + message + "\". " +
                "이 꿈을 한 줄로 간단하게 해석해주세요.";
        return chatModel.call(prompt);
    }

    // 카테고리 뽑기
    private String DetailedPrompt(String message) {
        // 프롬프트 작성 로직
        String prompt = "사용자가 꾼 꿈의 내용은 다음과 같습니다: \"" + message + "\". " +
                "이 꿈을 다음의 카테고리로 분류하고 각 카테고리별로 주요 단어를 JSON 형식으로 추출해주세요:\n" +
                "1. 꿈 종류 (dreamType): 이 꿈의 종류는 무엇입니까? (예: 일반 / 루시드드림 / 악몽 / 반복적 꿈 / 예지몽 / 생생한 꿈) 예시에 있는 종류로만 구분 해주세요 (루시드드림 / 악몽 / 반복적 꿈 / 예지몽 / 생생한 꿈)여기에 해당하지 않는 꿈은 일반으로 해주세요\n" +
                "2. 인물 (character): 꿈에 등장한 주요 인물은 누구입니까?\n" +
                "3. 기분 (mood): 이 꿈을 꿀 때 느낀 기분은 어떠했습니까? (예: 두려움, 기쁨, 슬픔 등)\n" +
                "4. 장소 (location): 꿈에서 나타난 주요 장소는 어디입니까?\n" +
                "5. 사물 또는 동물 (objects): 꿈에 등장한 주요 사물이나 동물은 무엇입니까? \n" +
                "응답은 JSON 형식으로 해주세요.";
        return prompt;
    }

    // 카테고리별 파싱
    private List<DreamCategoryDto> parseDreamCategories(String json) {
        try {
            json = json.trim();
            json = json.replace("```json", "").replace("```", "").replace("`", "").trim();

            JsonNode root = objectMapper.readTree(json);

            List<DreamCategoryDto> categories = new ArrayList<>();
            if (root.has("dreamType")) {
                String dreamType = root.get("dreamType").asText();
                if (!dreamType.isEmpty()) {
                    categories.add(new DreamCategoryDto(null, dreamType, "dreamType"));
                }
            }
            if (root.has("character")) {
                JsonNode characters = root.get("character");
                if (characters.isArray()) {
                    for (JsonNode characterNode : characters) {
                        String character = characterNode.asText();
                        if (!character.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, character, "character"));
                        }
                    }
                } else if (characters.isObject()) {
                    characters.fields().forEachRemaining(field -> {
                        String character = field.getValue().asText();
                        if (!character.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, character, "character"));
                        }
                    });
                }
            }
            if (root.has("mood")) {
                JsonNode moods = root.get("mood");
                if (moods.isArray()) {
                    for (JsonNode moodNode : moods) {
                        String mood = moodNode.asText();
                        if (!mood.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, mood, "mood"));
                        }
                    }
                } else if (moods.isObject()) {
                    moods.fields().forEachRemaining(field -> {
                        String mood = field.getValue().asText();
                        if (!mood.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, mood, "mood"));
                        }
                    });
                }
            }
            if (root.has("location")) {
                JsonNode locations = root.get("location");
                if (locations.isArray()) {
                    for (JsonNode locationNode : locations) {
                        String location = locationNode.asText();
                        if (!location.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, location, "location"));
                        }
                    }
                } else if (locations.isObject()) {
                    locations.fields().forEachRemaining(field -> {
                        String location = field.getValue().asText();
                        if (!location.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, location, "location"));
                        }
                    });
                }
            }
            if (root.has("objects")) {
                JsonNode objects = root.get("objects");
                if (objects.isArray()) {
                    for (JsonNode objectNode : objects) {
                        String object = objectNode.asText();
                        if (!object.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, object, "objects"));
                        }
                    }
                } else if (objects.isObject()) {
                    objects.fields().forEachRemaining(field -> {
                        String object = field.getValue().asText();
                        if (!object.isEmpty()) {
                            categories.add(new DreamCategoryDto(null, object, "objects"));
                        }
                    });
                }
            }

            return categories;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    // 순환 참조를 방지를 위한 메소드
    private DreamDto toDreamDto(Dream dream) {
        List<DreamCategoryDto> categoryDtos = dream.getDreamCategories().stream()
                .map(this::toDreamCategoryDto)
                .collect(Collectors.toList());
        return new DreamDto(dream.getId(), dream.getContent(), dream.getImage(), dream.getInterpretation(),
                dream.getSummary(), dream.isShared(), dream.getLikesCount(), dream.getUserId(),
                dream.getWriteTime(), categoryDtos);
    }

    // 순환 참조를 방지를 위한 메소드
    private DreamCategoryDto toDreamCategoryDto(DreamCategory dreamCategory) {
        return new DreamCategoryDto(dreamCategory.getId(), dreamCategory.getCategory().getWord(),
                dreamCategory.getCategory().getType().name());
    }
}
