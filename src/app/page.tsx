import QuizSetting from "./QuizSetting";

export default function Home() {
  return (
    <>
      <h1>포켓몬 종족값 퀴즈</h1>
      <h5>문제 갯수, 출제 범위, 힌트 여부를 선택해주세요</h5>
      <QuizSetting />
    </>
  );
}
