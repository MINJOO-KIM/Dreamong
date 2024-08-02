import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { useState } from 'react';

import NavigationBar from './components/NavigationBar';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LoginSuccess from './pages/LoginPage/components/LoginSuccess';
import DreamRegisterPage from './pages/DreamRegisterPage';
import DreamDetailPage from './pages/DreamDetailPage';
import SettingsPage from './pages/SettingsPage';
import StreamingPage from './pages/StreamingPage/StreamingPage';
import StreamingList from './pages/StreamingPage/components/StreamingList';
import StreamingRoom from './pages/StreamingPage/components/StreamingRoom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const toggleLoginStatus = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  return (
    <RecoilRoot>
      <Router>
        <div className="flex min-h-screen justify-center bg-purple-100">
          <div className="relative flex h-screen w-full max-w-[600px] flex-col bg-[url('/src/assets/background.svg')] bg-cover bg-center">
            <main className="flex-1 overflow-auto">
              <div className="min-h-full pb-[60px]">
                {' '}
                {/* NavigationBar 높이만큼 패딩 추가 */}
                <Routes>
                  <Route exact path="/" element={<MainPage />} />
                  <Route path="/dream/create" element={<DreamRegisterPage />} />
                  <Route path="/dream/:dreamId" element={<DreamDetailPage />} />
                  {/* <Route path="/dream/:dreamId/update" element={} /> */}
                  {/* <Route path="/square" element={} /> */}
                  {/* <Route path="/square/:dreamId" element={} /> */}
                  <Route path="/streaming" element={<StreamingPage />}>
                    <Route index element={<StreamingList />} />
                    {/* <Route path="create" element={} /> */}
                    <Route path=":roomId" element={<StreamingRoom />} />
                  </Route>
                  {/* <Route path="/statics" element={} /> */}
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route
                    path="/login"
                    element={<LoginPage isLoggedIn={isLoggedIn} toggleLoginStatus={toggleLoginStatus} />}
                  />
                  <Route
                    path="/oauth/callback/kakao"
                    element={<LoginSuccess isLoggedIn={isLoggedIn} toggleLoginStatus={toggleLoginStatus} />}
                  />
                </Routes>
              </div>
            </main>
            <NavigationBar />
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
