import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>제목이다다당</h1>
      <h5>부제목이다다당</h5>
      <Link href="stats">
        <button>종족값 퀴즈</button>
      </Link>
      <div>반갑다다다당</div>
    </>
  );
}
