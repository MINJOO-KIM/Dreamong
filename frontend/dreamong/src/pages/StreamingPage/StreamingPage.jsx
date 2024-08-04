import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../../components/Button';
import { Outlet } from 'react-router-dom';

// Make sure to set the app element for accessibility
Modal.setAppElement('#root');

const StreamingPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContentVisible, setModalContentVisible] = useState(false);

  const [sleepTime, setSleepTime] = useState(sessionStorage.getItem('sleepTime') || null);

  const toggleModalIsOpen = () => {
    if (!modalIsOpen) {
      setModalIsOpen(true);
      setTimeout(() => setModalContentVisible(true), 50);
    } else {
      setModalContentVisible(false);
      setTimeout(() => setModalIsOpen(false), 300);
    }
  };

  const handleSleepTimeSave = (event) => {
    event.preventDefault();
    const setTime = event.target.elements.sleepTime.value;
    setSleepTime(setTime);

    const [hours, mins] = setTime.split(':').map(Number);
    const now = new Date();
    const nowHours = now.getHours();
    const nowMins = now.getMinutes();

    // 시간 차이 계산
    let diffHours = hours - nowHours;
    let diffMins = mins - nowMins;

    // 분 조정
    if (diffMins < 0) {
      diffMins += 60;
      diffHours -= 1;
    }

    // 시간 조정
    if (diffHours < 0) {
      diffHours += 24;
    }

    const isNewSetting = !sessionStorage.getItem('sleepTime');
    sessionStorage.setItem('sleepTime', setTime);
    toggleModalIsOpen();

    const message = isNewSetting ? '취침모드 설정이 완료되었습니다!' : '취침모드 수정이 완료되었습니다!';

    alert(`${message}\n취침 예정 시간까지 약 ${diffHours}시간 ${diffMins}분 남았습니다.`);
  };

  return (
    <div className="h-full p-2">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModalIsOpen}
        className="fixed left-8 right-8 top-12 z-50"
        overlayClassName="fixed inset-0 bg-black transition-opacity duration-300 ease-in-out"
        closeTimeoutMS={300}
        style={{
          overlay: {
            backgroundColor: modalIsOpen ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
          },
        }}
      >
        <form
          onSubmit={handleSleepTimeSave}
          className={`flex w-full max-w-md flex-col justify-center rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ease-in-out ${
            modalContentVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <h2 className="mb-4 text-center text-2xl font-bold">취침모드 설정</h2>
          <input
            type="time"
            name="sleepTime"
            id="sleepTime"
            defaultValue={sleepTime}
            className="mb-4 h-10 w-full appearance-none text-lg"
          />
          <div className="flex justify-end">
            <Button type="button" variant="secondary" size="md" onClick={toggleModalIsOpen} className="mx-2">
              취소
            </Button>
            <Button type="submit" variant="primary" size="md">
              저장
            </Button>
          </div>
        </form>
      </Modal>

      <section className="flex justify-end">
        <Button size="md" className="text-white hover:text-gray-300" onClick={toggleModalIsOpen}>
          취침모드 설정
        </Button>
      </section>
      <Outlet />
    </div>
  );
};

export default StreamingPage;
