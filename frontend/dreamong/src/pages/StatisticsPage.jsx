import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { baseURLState, userState } from '../recoil/atoms';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import StatisticsSkeletonPage from './SkeletonPage/StatisticsSkeletonPage';

Chart.register(...registerables);

const StatisticsPage = () => {
  const user = useRecoilValue(userState);
  const baseURL = useRecoilValue(baseURLState);
  const nickname = user.nickname;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [yearMonth, setYearMonth] = useState(`${currentYear}${String(currentMonth).padStart(2, '0')}`);
  const [currentDate, setCurrentDate] = useState(`${currentYear}${String(currentMonth).padStart(2, '0')}`);

  const [objects, setObjects] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [moods, setMoods] = useState([]);
  const [dreamTypeCounts, setDreamTypeCounts] = useState([]);

  const chartRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, [currentDate]);

  useEffect(() => {
    if (chartRef.current) {
      renderChart();
    }
  }, [dreamTypeCounts]);

  const handleYearMonthChange = (e) => {
    const selectedYearMonth = e.target.value;
    setYearMonth(selectedYearMonth);
    setCurrentDate(selectedYearMonth);
  };

  const generateYearMonthOptions = () => {
    const options = [];
    for (let y = currentYear - 5; y <= currentYear; y++) {
      for (let m = 1; m <= 12; m++) {
        if (y === currentYear && m > currentMonth) break;
        const value = `${y}${String(m).padStart(2, '0')}`;
        const label = `${y}년 ${String(m).padStart(2, '0')}월`;
        options.push({ value, label });
      }
    }
    return options;
  };

  const fetchStatistics = async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${baseURL}/statistics/${user.userId}/${currentDate}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const statistics = response.data.data;
      // console.log(statistics);
      // console.log(isLoading);
      setObjects(statistics.objects || []);
      setCharacters(statistics.characters || []);
      setLocations(statistics.locations || []);
      setMoods(statistics.moods || []);
      setDreamTypeCounts(statistics.dreamTypeCounts || []);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChart = () => {
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
    const defaultDreamTypes = ['일반', '루시드드림', '악몽', '반복적 꿈', '예지몽', '생생한 꿈'];
    const counts = defaultDreamTypes.map((type) => {
      const dreamTypeCount = dreamTypeCounts.find((item) => item.dreamType === type);
      return dreamTypeCount ? dreamTypeCount.count : 0;
    });
    chartRef.current.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: defaultDreamTypes,
        datasets: [
          {
            label: '꿈 종류별 횟수',
            data: counts,
            backgroundColor: '#E3DEFF',
            borderColor: '#B6ADF1',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              maxRotation: 0, // 레이블 기울기 설정
              minRotation: 0, // 필요시 최소 기울기 설정
              autoSkip: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#3a3a3a]">
      <div className="flex h-full w-full max-w-md flex-col items-center justify-start bg-[#3a3a3a]">
        {/* 안내 문구 */}
        <div className="mr-10 mt-8 flex h-16 w-full flex-col items-end justify-start gap-1 text-lg text-white">
          <p>{nickname}님의 꿈 속에서</p>
          <p>일어난 일을 분석해봤어요</p>
        </div>
        {/* 월별 선택 */}
        <div className="mt-4 flex items-center space-x-2">
          <select
            value={yearMonth}
            onChange={handleYearMonthChange}
            className="rounded-md border border-[#3a3a3a] bg-[#3a3a3a] p-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {generateYearMonthOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <StatisticsSkeletonPage />
      ) : (
        <div className="m-8">
          {/* 사물 */}
          <div className="h-82 flex w-full flex-col justify-center gap-2 rounded-3xl border-black bg-[#0000007c] p-6">
            <div className="m-1 text-center text-white">이번달의 키워드는 무엇일까요?</div>
            {objects.length > 0 ? (
              objects.map((object, index) => (
                <div key={index} className="">
                  <div className="h-full w-full rounded-3xl border-black bg-tag-gradient p-4">
                    <div className="flex">
                      <p>{index + 1}위 </p>
                      <p className="px-2 font-bold">{object.word}</p>
                    </div>
                    <p className="text-sm font-bold text-[#9CA1E1]">{object.hashTags.join(' ')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">이번달에 분석된 키워드가 없습니다.</p>
            )}
          </div>

          <div className="mt-6 flex w-full justify-between">
            {/* 인물 */}
            <div className="h-40 w-40 rounded-3xl bg-[#E3DEFF]">
              <p className="text-md mb-4 mt-6 text-center">누가 자주 나왔을까요?</p>
              {characters.length > 0 ? (
                characters.map((character, index) => (
                  <div key={index} className="text-center text-sm text-black">
                    <div className="flex justify-center align-middle">
                      <p>{index + 1}위</p>
                      <p className="px-2 font-bold">{character.word}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-bold mt-3 items-center text-center text-gray-500">
                  이번달에 분석된 <br />
                  키워드가 없습니다.
                </p>
              )}
            </div>
            {/* 장소 */}
            <div className="h-40 w-40 rounded-3xl bg-[#36258D] text-center">
              <p className="text-md mb-4 mt-6 text-white">자주 간 장소예요!</p>
              {locations.length > 0 ? (
                locations.map((location, index) => (
                  <div key={index} className="text-sm text-white">
                    <div className="flex justify-center align-middle">
                      <p className="text-center">{index + 1}위</p>
                      <p className="px-2 font-bold">{location.word}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-bold mt-3 items-center text-center text-gray-500">
                  이번달에 분석된 <br />
                  키워드가 없습니다.
                </p>
              )}
            </div>
          </div>
          {/* 기분 */}
          <div className="mt-6 flex min-h-48 w-full flex-col items-center justify-center gap-2.5 rounded-3xl bg-[white] p-6">
            <div className="mb-">이번달에 느낀 감정이에요</div>
            <div className="flex flex-wrap justify-center">
              {moods.length > 0 ? (
                moods.slice(0, 10).map((mood, index) => (
                  <div key={index} className="mx-1 my-2 flex rounded-3xl bg-tag-gradient px-4 py-2 shadow-md">
                    <div className="flex w-full justify-center align-middle">{mood.word}</div>
                  </div>
                ))
              ) : (
                <p className="text-bold mt-3 items-center text-center text-gray-500">
                  이번달에 분석된 <br />
                  키워드가 없습니다.
                </p>
              )}
            </div>
          </div>

          {/* 꿈종류 그래프 */}
          <div className="relative mt-6 flex h-64 w-full items-end justify-center gap-4 rounded-3xl bg-[white] p-2.5">
            <div className="text-md absolute left-1/2 top-2 mt-4 -translate-x-1/2 transform">
              이번달에 꾼 꿈 종류예요
            </div>
            <canvas ref={chartRef} className="mb-4 h-full w-full" />
          </div>
        </div>
      )}
    </div>
  );
};
export default StatisticsPage;
