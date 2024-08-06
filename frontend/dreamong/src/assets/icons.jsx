// Navigationbar.jsx에 사용되는 svg
// {MainIcon,SquareIcon, CreateIcon, StreamingIcon, SettingsIcon, STTIcon }
import { useRecoilValue } from 'recoil';
import { isListeningState } from '../recoil/atoms';

export const MainIcon = ({ color }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 7.95L10.5 2L19 7.95V17.3C19 17.7509 18.801 18.1833 18.4468 18.5021C18.0925 18.8209 17.6121 19 17.1111 19H3.88889C3.38792 19 2.90748 18.8209 2.55324 18.5021C2.19901 18.1833 2 17.7509 2 17.3V7.95Z"
      stroke={color}
      strokeWidth="3.45645"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.66699 19V10.5H13.3337V19"
      stroke={color}
      strokeWidth="3.45645"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const SquareIcon = ({ color }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 10.0278C19.0032 11.2743 18.712 12.504 18.15 13.6167C17.4836 14.95 16.4592 16.0714 15.1915 16.8554C13.9237 17.6394 12.4628 18.055 10.9722 18.0556C9.72567 18.0588 8.49599 17.7676 7.38332 17.2056L2 19L3.79444 13.6167C3.23243 12.504 2.94119 11.2743 2.94444 10.0278C2.94502 8.53723 3.36058 7.07627 4.14456 5.80854C4.92855 4.54081 6.05001 3.51639 7.38332 2.85003C8.49599 2.28802 9.72567 1.99678 10.9722 2.00003H11.4444C13.413 2.10863 15.2723 2.93952 16.6664 4.33361C18.0605 5.7277 18.8914 7.58702 19 9.55557V10.0278Z"
      stroke={color}
      strokeWidth="3.45645"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const CreateIcon = ({ color }) => (
  <svg
    className="absolute left-[-26px] top-[-25px]"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 25C0 11.1929 11.1929 0 25 0V0C38.8071 0 50 11.1929 50 25V25C50 38.8071 38.8071 50 25 50V50C11.1929 50 0 38.8071 0 25V25Z"
      fill="#737DFE"
    />
    <path
      d="M37.8594 23.5737H27.1451V12.8594H23.5737V23.5737H12.8594V27.1451H23.5737V37.8594H27.1451V27.1451H37.8594V23.5737Z"
      fill="white"
    />
  </svg>
);
export const StreamingIcon = ({ color }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 16.1665V10.4999C2 8.24558 2.89552 6.0836 4.48956 4.48956C6.0836 2.89552 8.24558 2 10.4999 2C12.7542 2 14.9162 2.89552 16.5102 4.48956C18.1043 6.0836 18.9998 8.24558 18.9998 10.4999V16.1665"
      stroke={color}
      strokeWidth="3.45645"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.9998 17.1113C18.9998 17.6123 18.8008 18.0927 18.4466 18.447C18.0923 18.8012 17.6119 19.0002 17.1109 19.0002H16.1665C15.6655 19.0002 15.1851 18.8012 14.8309 18.447C14.4766 18.0927 14.2776 17.6123 14.2776 17.1113V14.278C14.2776 13.7771 14.4766 13.2966 14.8309 12.9424C15.1851 12.5882 15.6655 12.3892 16.1665 12.3892H18.9998V17.1113ZM2 17.1113C2 17.6123 2.199 18.0927 2.55324 18.447C2.90747 18.8012 3.38791 19.0002 3.88887 19.0002H4.8333C5.33426 19.0002 5.8147 18.8012 6.16893 18.447C6.52316 18.0927 6.72216 17.6123 6.72216 17.1113V14.278C6.72216 13.7771 6.52316 13.2966 6.16893 12.9424C5.8147 12.5882 5.33426 12.3892 4.8333 12.3892H2V17.1113Z"
      stroke={color}
      strokeWidth="3.45645"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const SettingsIcon = ({ color }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.4998 12.818C11.7801 12.818 12.818 11.7801 12.818 10.4998C12.818 9.21953 11.7801 8.18164 10.4998 8.18164C9.21953 8.18164 8.18164 9.21953 8.18164 10.4998C8.18164 11.7801 9.21953 12.818 10.4998 12.818Z"
      stroke={color}
      strokeWidth="2.82801"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.2182 12.8182C16.1153 13.0512 16.0846 13.3098 16.1301 13.5605C16.1755 13.8111 16.295 14.0424 16.4732 14.2245L16.5195 14.2709C16.6632 14.4144 16.7772 14.5849 16.855 14.7725C16.9328 14.9601 16.9728 15.1612 16.9728 15.3643C16.9728 15.5674 16.9328 15.7685 16.855 15.9561C16.7772 16.1438 16.6632 16.3142 16.5195 16.4577C16.376 16.6014 16.2056 16.7154 16.018 16.7932C15.8303 16.871 15.6292 16.911 15.4261 16.911C15.223 16.911 15.0219 16.871 14.8343 16.7932C14.6467 16.7154 14.4763 16.6014 14.3327 16.4577L14.2864 16.4114C14.1042 16.2332 13.8729 16.1137 13.6223 16.0683C13.3716 16.0228 13.1131 16.0535 12.88 16.1564C12.6515 16.2543 12.4565 16.417 12.3192 16.6243C12.1819 16.8316 12.1083 17.0745 12.1073 17.3232V17.4545C12.1073 17.8644 11.9444 18.2575 11.6546 18.5473C11.3648 18.8372 10.9717 19 10.5618 19C10.1519 19 9.75885 18.8372 9.46902 18.5473C9.17919 18.2575 9.01636 17.8644 9.01636 17.4545V17.385C9.01038 17.1292 8.92759 16.8812 8.77876 16.6731C8.62992 16.465 8.42193 16.3065 8.18182 16.2182C7.94875 16.1153 7.69021 16.0846 7.43955 16.1301C7.18888 16.1755 6.95757 16.295 6.77545 16.4732L6.72909 16.5195C6.58556 16.6632 6.41511 16.7772 6.2275 16.855C6.03988 16.9328 5.83878 16.9728 5.63568 16.9728C5.43259 16.9728 5.23148 16.9328 5.04387 16.855C4.85625 16.7772 4.6858 16.6632 4.54227 16.5195C4.39858 16.376 4.28459 16.2056 4.20682 16.018C4.12904 15.8303 4.08901 15.6292 4.08901 15.4261C4.08901 15.223 4.12904 15.0219 4.20682 14.8343C4.28459 14.6467 4.39858 14.4763 4.54227 14.3327L4.58864 14.2864C4.76678 14.1042 4.88628 13.8729 4.93173 13.6223C4.97718 13.3716 4.9465 13.1131 4.84364 12.88C4.74568 12.6515 4.58304 12.4565 4.37572 12.3192C4.16841 12.1819 3.92547 12.1083 3.67682 12.1073H3.54545C3.13557 12.1073 2.74248 11.9444 2.45265 11.6546C2.16282 11.3648 2 10.9717 2 10.5618C2 10.1519 2.16282 9.75885 2.45265 9.46902C2.74248 9.17919 3.13557 9.01636 3.54545 9.01636H3.615C3.87077 9.01038 4.11882 8.92759 4.32691 8.77876C4.535 8.62992 4.69351 8.42193 4.78182 8.18182C4.88468 7.94875 4.91536 7.69021 4.86991 7.43955C4.82446 7.18888 4.70496 6.95757 4.52682 6.77545L4.48045 6.72909C4.33676 6.58556 4.22277 6.41511 4.145 6.2275C4.06722 6.03988 4.02719 5.83878 4.02719 5.63568C4.02719 5.43259 4.06722 5.23148 4.145 5.04387C4.22277 4.85625 4.33676 4.6858 4.48045 4.54227C4.62399 4.39858 4.79443 4.28459 4.98205 4.20682C5.16966 4.12904 5.37077 4.08901 5.57386 4.08901C5.77696 4.08901 5.97807 4.12904 6.16568 4.20682C6.3533 4.28459 6.52374 4.39858 6.66727 4.54227L6.71364 4.58864C6.89575 4.76678 7.12706 4.88628 7.37773 4.93173C7.6284 4.97718 7.88693 4.9465 8.12 4.84364H8.18182C8.41037 4.74568 8.60529 4.58304 8.74258 4.37572C8.87988 4.16841 8.95355 3.92547 8.95455 3.67682V3.54545C8.95455 3.13557 9.11737 2.74248 9.4072 2.45265C9.69703 2.16282 10.0901 2 10.5 2C10.9099 2 11.303 2.16282 11.5928 2.45265C11.8826 2.74248 12.0455 3.13557 12.0455 3.54545V3.615C12.0464 3.86365 12.1201 4.10659 12.2574 4.31391C12.3947 4.52122 12.5896 4.68387 12.8182 4.78182C13.0512 4.88468 13.3098 4.91536 13.5605 4.86991C13.8111 4.82446 14.0424 4.70496 14.2245 4.52682L14.2709 4.48045C14.4144 4.33676 14.5849 4.22277 14.7725 4.145C14.9601 4.06722 15.1612 4.02719 15.3643 4.02719C15.5674 4.02719 15.7685 4.06722 15.9561 4.145C16.1438 4.22277 16.3142 4.33676 16.4577 4.48045C16.6014 4.62399 16.7154 4.79443 16.7932 4.98205C16.871 5.16966 16.911 5.37077 16.911 5.57386C16.911 5.77696 16.871 5.97807 16.7932 6.16568C16.7154 6.3533 16.6014 6.52374 16.4577 6.66727L16.4114 6.71364C16.2332 6.89575 16.1137 7.12706 16.0683 7.37773C16.0228 7.6284 16.0535 7.88693 16.1564 8.12V8.18182C16.2543 8.41037 16.417 8.60529 16.6243 8.74258C16.8316 8.87988 17.0745 8.95355 17.3232 8.95455H17.4545C17.8644 8.95455 18.2575 9.11737 18.5473 9.4072C18.8372 9.69703 19 10.0901 19 10.5C19 10.9099 18.8372 11.303 18.5473 11.5928C18.2575 11.8826 17.8644 12.0455 17.4545 12.0455H17.385C17.1363 12.0464 16.8934 12.1201 16.6861 12.2574C16.4788 12.3947 16.3161 12.5896 16.2182 12.8182Z"
      stroke={color}
      strokeWidth="2.82801"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const STTIcon = ({ handleSTT }) => {
  const isListening = useRecoilValue(isListeningState);
  return (
    <svg
      onClick={() => handleSTT()}
      className="absolute left-[-26px] top-[-25px]"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 25C0 11.1929 11.1929 0 25 0V0C38.8071 0 50 11.1929 50 25V25C50 38.8071 38.8071 50 25 50V50C11.1929 50 0 38.8071 0 25V25Z"
        fill="#737DFE"
      />
      <path
        d="M25 7C23.4087 7 21.8826 7.49668 20.7574 8.38078C19.6321 9.26488 19 10.464 19 11.7143V24.2857C19 25.536 19.6321 26.7351 20.7574 27.6192C21.8826 28.5033 23.4087 29 25 29C26.5913 29 28.1174 28.5033 29.2426 27.6192C30.3679 26.7351 31 25.536 31 24.2857V11.7143C31 10.464 30.3679 9.26488 29.2426 8.38078C28.1174 7.49668 26.5913 7 25 7Z"
        stroke={isListening ? 'red' : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.7206 21.3672V24.4701C35.7206 27.3505 34.5764 30.1128 32.5397 32.1495C30.503 34.1863 27.7407 35.3305 24.8603 35.3305C21.98 35.3305 19.2176 34.1863 17.1809 32.1495C15.1442 30.1128 14 27.3505 14 24.4701V21.3672"
        stroke={isListening ? 'red' : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.8594 35.3311V41.537"
        stroke={isListening ? 'red' : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.6543 41.5371H31.0661"
        stroke={isListening ? 'red' : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// MainPage에서 사용하는 svg
export const StatisticsIcon = (
  <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4297 1.79167C11.9349 1.79167 11.5339 2.19274 11.5339 2.6875V26.763H16.7969V2.6875C16.7969 2.19274 16.3958 1.79167 15.901 1.79167H12.4297ZM18.5885 26.763H23.8516V11.1797H18.5885V26.763ZM18.5885 9.38808V2.6875C18.5885 1.20323 17.3853 0 15.901 0H12.4297C10.9454 0 9.74219 1.20323 9.74219 2.6875V18.0755H5.15104C3.66678 18.0755 2.46354 19.2788 2.46354 20.7631V26.763H0.895833C0.401078 26.763 0 27.1641 0 27.6589C0 28.1536 0.401078 28.5547 0.895833 28.5547H34.7135C35.2083 28.5547 35.6094 28.1536 35.6094 27.6589C35.6094 27.1641 35.2083 26.763 34.7135 26.763H32.6979V7.31148C32.6979 5.82721 31.4947 4.62398 30.0104 4.62398H26.5391C25.0548 4.62398 23.8516 5.82721 23.8516 7.31148V9.38808H18.5885ZM30.9063 26.763V7.31148C30.9063 6.81672 30.5052 6.41564 30.0104 6.41564H26.5391C26.0443 6.41564 25.6432 6.81672 25.6432 7.31148V26.763H30.9063ZM4.25521 26.763H9.74219V19.8672H5.15104C4.65629 19.8672 4.25521 20.2683 4.25521 20.7631V26.763Z"
      fill="white"
    />
  </svg>
);

export const SmallLoadingSpinner = (
  <svg
    className="mx-3 animate-spin"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10Z"
      fill="#AEAEAE"
    />
    <path
      d="M10 0C11.7376 2.07208e-08 13.4452 0.452769 14.9546 1.31368C16.4639 2.1746 17.7229 3.41395 18.6074 4.90959C19.4919 6.40522 19.9715 8.10553 19.9988 9.84293C20.0261 11.5803 19.6002 13.2949 18.7631 14.8175L16.1341 13.3723C16.7201 12.3064 17.0182 11.1062 16.9991 9.89005C16.98 8.67387 16.6444 7.48366 16.0252 6.43671C15.406 5.38976 14.5248 4.52222 13.4682 3.91958C12.4117 3.31694 11.2163 3 10 3L10 0Z"
      fill="white"
    />
  </svg>
);

export const LargeLoadingSpinner = (
  <svg
    className="inline-block animate-spin"
    width="100"
    height="101"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5C100 78.1142 77.6142 100.5 50 100.5C22.3858 100.5 0 78.1142 0 50.5C0 22.8858 22.3858 0.5 50 0.5C77.6142 0.5 100 22.8858 100 50.5ZM15 50.5C15 69.83 30.67 85.5 50 85.5C69.33 85.5 85 69.83 85 50.5C85 31.17 69.33 15.5 50 15.5C30.67 15.5 15 31.17 15 50.5Z"
      fill="#AEAEAE"
    />
    <path
      d="M50 0.5C58.6881 0.5 67.2262 2.76384 74.7729 7.06842C82.3197 11.373 88.6145 17.5697 93.0371 25.0479C97.4597 32.5261 99.8574 41.0276 99.9938 49.7146C100.13 58.4016 98.0008 66.9743 93.8153 74.5877L80.6707 67.3614C83.6006 62.032 85.0912 56.0311 84.9957 49.9502C84.9002 43.8693 83.2218 37.9183 80.126 32.6835C77.0302 27.4488 72.6238 23.1111 67.3411 20.0979C62.0583 17.0847 56.0816 15.5 50 15.5L50 0.5Z"
      fill="white"
    />
  </svg>
);

export const SmallRegeneratorIcon = (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1188_2581)">
      <path
        d="M15 0C18.9737 0.0138341 22.7805 1.59973 25.5888 4.41125L28.75 1.25V8.63625C28.7502 8.81539 28.715 8.9928 28.6465 9.15833C28.5781 9.32386 28.4776 9.47427 28.3509 9.60093C28.2243 9.7276 28.0739 9.82805 27.9083 9.89653C27.7428 9.965 27.5654 10.0002 27.3863 10H20L22.9413 7.05875C21.0997 5.22607 18.6797 4.08853 16.0936 3.8399C13.5074 3.59128 10.915 4.24694 8.75804 5.69522C6.60107 7.14349 5.01291 9.29478 4.26411 11.7826C3.5153 14.2705 3.65218 16.941 4.65142 19.3392C5.65066 21.7374 7.45044 23.7151 9.74419 24.9352C12.0379 26.1554 14.6838 26.5426 17.231 26.0308C19.7781 25.5191 22.0691 24.1401 23.7137 22.1287C25.3582 20.1174 26.2545 17.5981 26.25 15H30C30 17.9667 29.1203 20.8668 27.4721 23.3336C25.8238 25.8003 23.4812 27.7229 20.7403 28.8582C17.9994 29.9935 14.9834 30.2906 12.0737 29.7118C9.16394 29.133 6.49119 27.7044 4.39341 25.6066C2.29562 23.5088 0.867006 20.8361 0.288228 17.9264C-0.290551 15.0166 0.00649929 12.0006 1.14181 9.25975C2.27713 6.51886 4.19972 4.17618 6.66645 2.52796C9.13319 0.879735 12.0333 0 15 0V0Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1188_2581">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const LargeRegeneratorIcon = (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1188_2581)">
      <path
        d="M15 0C18.9737 0.0138341 22.7805 1.59973 25.5888 4.41125L28.75 1.25V8.63625C28.7502 8.81539 28.715 8.9928 28.6465 9.15833C28.5781 9.32386 28.4776 9.47427 28.3509 9.60093C28.2243 9.7276 28.0739 9.82805 27.9083 9.89653C27.7428 9.965 27.5654 10.0002 27.3863 10H20L22.9413 7.05875C21.0997 5.22607 18.6797 4.08853 16.0936 3.8399C13.5074 3.59128 10.915 4.24694 8.75804 5.69522C6.60107 7.14349 5.01291 9.29478 4.26411 11.7826C3.5153 14.2705 3.65218 16.941 4.65142 19.3392C5.65066 21.7374 7.45044 23.7151 9.74419 24.9352C12.0379 26.1554 14.6838 26.5426 17.231 26.0308C19.7781 25.5191 22.0691 24.1401 23.7137 22.1287C25.3582 20.1174 26.2545 17.5981 26.25 15H30C30 17.9667 29.1203 20.8668 27.4721 23.3336C25.8238 25.8003 23.4812 27.7229 20.7403 28.8582C17.9994 29.9935 14.9834 30.2906 12.0737 29.7118C9.16394 29.133 6.49119 27.7044 4.39341 25.6066C2.29562 23.5088 0.867006 20.8361 0.288228 17.9264C-0.290551 15.0166 0.00649929 12.0006 1.14181 9.25975C2.27713 6.51886 4.19972 4.17618 6.66645 2.52796C9.13319 0.879735 12.0333 0 15 0V0Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1188_2581">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
