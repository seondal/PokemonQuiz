import useQuizStore from "@/store/useQuizStore";
import useScoreStore from "@/store/useScoreStore";
import { useRouter } from "next/navigation";

export default function EndingPage() {
  const router = useRouter();
  const { quizList, reset: resetQuiz } = useQuizStore();
  const { solved, reset: resetScore } = useScoreStore();

  const total = quizList.length;

  function onClick() {
    resetQuiz();
    resetScore();
    router.back();
  }

  return (
    <div>
      수고하셨습니다!
      <h3>
        {total}개 중 {solved}개 맞추셨습니다
      </h3>
      <h4>정답률 : {Math.floor((solved / total) * 100)}%</h4>
      <button onClick={onClick}>다시 풀러 가기</button>
    </div>
  );
}
