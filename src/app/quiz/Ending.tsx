export default function EndingPage() {
  const total = 77;
  const solved = 99;

  return (
    <div>
      수고하셨습니다!
      <h3>
        {total}개 중 {solved}개 맞추셨습니다
      </h3>
    </div>
  );
}
