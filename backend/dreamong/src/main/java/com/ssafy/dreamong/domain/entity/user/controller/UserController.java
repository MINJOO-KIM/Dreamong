package com.ssafy.dreamong.domain.entity.user.controller;

import com.ssafy.dreamong.domain.entity.common.ApiResponse;
import com.ssafy.dreamong.domain.entity.user.User;
import com.ssafy.dreamong.domain.entity.user.dto.UpdateNicknameRequest;
import com.ssafy.dreamong.domain.entity.user.dto.UserInfoResponse;
import com.ssafy.dreamong.domain.entity.user.repository.UserRepository;
import com.ssafy.dreamong.domain.entity.user.service.UserService;
import com.ssafy.dreamong.domain.oauth.dto.CustomOAuth2User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/")
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<UserInfoResponse>> getUserInfo(@AuthenticationPrincipal CustomOAuth2User oAuth2User) {
        log.info("사용자 pk: {}: ", oAuth2User.getUserId());
        log.info("{}: ", oAuth2User.getUserId());
        UserInfoResponse userInfoResponse = userService.getUserInfo(oAuth2User.getUserId());
        log.info("userInfoResponse: {}", userInfoResponse);
        return new ResponseEntity<>(ApiResponse.success(userInfoResponse), HttpStatus.OK);
    }


    /**
     * @param oAuth2User
     * @param response
     * @param request
     * @return
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@AuthenticationPrincipal CustomOAuth2User oAuth2User, HttpServletResponse response
            , HttpServletRequest request) {
        log.info("헤더: {}", request.getHeader("Authorization"));
        log.info("로그아웃 요청  사용자PK : {}: ", oAuth2User.getUserId());
        Integer userId = oAuth2User.getUserId();

        // User의 RefreshToken 제거
        userService.clearRefreshToken(userId);

        // RefreshToken 쿠키 삭제
        Cookie cookie = new Cookie("RefreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        response.addCookie(cookie);

        log.info("Refresh token cookie deleted and user logged out: {}", userId);

        return new ResponseEntity<>(ApiResponse.success(), HttpStatus.OK);
    }

    @PatchMapping("/nickname")
    public ResponseEntity<ApiResponse<Void>> updateNickname(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                                            @RequestBody UpdateNicknameRequest updateNicknameRequest) {
        Integer userId = oAuth2User.getUserId();

        log.info("requestBody: {}", updateNicknameRequest.getNickname());
        User user = userRepository.findById(userId).orElseThrow();
        user.updateNickname(updateNicknameRequest.getNickname());
        userRepository.save(user);
        return new ResponseEntity<>(ApiResponse.success(), HttpStatus.OK);
    }

}
