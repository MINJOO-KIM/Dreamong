// React 관련 패키지
import { useState } from 'react';

// 앱 내부의 상태 관리와 관련된 파일
import { useRecoilValue } from 'recoil';
import { baseURLState } from '../../../recoil/atoms';

// 외부 라이브러리
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';

// 앱 내부의 컴포넌트/아이콘
import { useHandleError } from '../../../utils/utils';
import { LargeLoadingSpinner, LargeRegeneratorIcon } from '../../../assets/icons';

/** - 이미지 생성 오류 발생시 현재위치
 * - 검열이미지 대체할 요소 고려 필요!
 */
const ImageGenerator = ({ MIN_LENGTH, classList, content, image, setImage }) => {
  const baseURL = useRecoilValue(baseURLState);
  const handleError = useHandleError();

  // 이미지 생성시에 필요한 요소들
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState(null);
  const [selected, setSelected] = useState(null);

  // 검열시에 표현될 요소
  const censored = (
    <div className="flex h-full w-full items-center bg-black text-white">
      <p>검열된 이미지입니다.</p>
    </div>
  );

  async function handleImgGenerator() {
    try {
      setIsGenerating(true);

      // 꿈의 길이가 최소길이 이상일 때 생성 가능
      if (content.length < MIN_LENGTH) {
        Swal.fire({
          text: `정확한 이미지 생성을 위해 꿈 내용을 ${MIN_LENGTH}자 이상 작성해주세요.`,
          icon: 'warning',
          confirmButtonText: '확인',
        });
        return 0;
      }
      // content를 사용해 이미지 생성
      const requestData = {
        prompt: content,
      };
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(`${baseURL}/api/generate-image`, requestData, {
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json; charset=UTF-8' },
      });

      // 검열된 이미지 존재시에 그만큼 공백 추가
      const censoredOptions = response.data.data;
      while (censoredOptions.length < 4) {
        censoredOptions.push('');
      }
      // 생성된 이미지 선택지 제공
      setOptions(censoredOptions);
    } catch (err) {
      console.log(err);
      setImage(null);
      setIsGenerating(false);
      setOptions(null);
      Swal.fire({
        icon: 'error',
        text: '오류가 발생했습니다. 다시 시도해주세요.',
      });
    }
  }

  // 이미지 재생성 버튼, 기존의 이미지와 선택지들 초기화한 후에 생성
  async function imgRegenerator() {
    try {
      setImage(null);
      setOptions(null);
      setSelected(null);
      await handleImgGenerator();
    } catch {
      handleError();
    }
  }

  const handleSelected = (i) => {
    if (options[i] == '') {
      Swal.fire({
        icon: 'warning',
        text: '검열된 이미지는 선택할 수 없습니다.',
        confirmButtonText: '확인',
      });
      return;
    }
    setSelected(i);
  };

  const handleImage = (i) => {
    setImage(options[i]);
    setIsGenerating(false);
    setOptions(null);
    setSelected(null);
  };

  if (image) {
    return (
      <div className={`${classList} relative rounded-lg`}>
        <button onClick={() => imgRegenerator()} className="z-1 absolute right-6 top-6">
          {LargeRegeneratorIcon}
        </button>
        <img src={image}></img>
      </div>
    );
  }

  if (options) {
    return (
      <div className={`${classList}`}>
        <p className="my-3 text-center text-lg">그림을 선택하세요</p>
        <div className="grid grid-cols-2">
          {options.map((img, idx) => (
            <div
              key={idx}
              className={`relative block h-full p-1 ${selected == idx ? 'rounded-lg border border-slate-100' : null}`}
            >
              {/* 이미지가 존재하면 표시, 검열된 이미지면 다른 이미지 렌더링 */}
              {img ? (
                <img
                  onClick={() => handleSelected(idx)}
                  className="block h-full w-full rounded-lg"
                  src={img}
                  key={idx}
                ></img>
              ) : (
                censored
              )}
              {selected == idx ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 text-white">
                  <button
                    className="rounded-full bg-primary-500 px-3 py-1 text-white"
                    onClick={() => {
                      handleImage(idx);
                    }}
                  >
                    선택
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="my-3 flex justify-around">
          <button onClick={() => imgRegenerator()}>{LargeRegeneratorIcon}</button>
        </div>
      </div>
    );
  }

  // 생성중에는 로딩스피너
  if (isGenerating) {
    // return <button className={`${classList} h-40 flex-col items-center justify-center`}>{LargeLoadingSpinner}</button>;
    return (
      <div className={`${classList} flex-row`}>
        <button className={`flex h-40 w-full items-center justify-center`}>
          <div class="loader"></div>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => handleImgGenerator()}
      className="my-2 w-full flex-row items-center justify-center rounded-lg bg-primary-500 p-4"
    >
      <img className="inline-block h-20 w-20" src="../src/assets/img_generator.png" alt="이미지 생성하기"></img>
      <p className="py-2 font-bold">꿈 이미지 생성하기</p>
    </button>
  );
};

export default ImageGenerator;
