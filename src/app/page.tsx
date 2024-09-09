import Link from "next/link";

const LATEST_GENERATION = 9;
const GENERATION = Array.from(
  { length: LATEST_GENERATION },
  (_, index) => index + 1
);

export default function Home() {
  return (
    <>
      <h1>포켓몬 종족값 퀴즈</h1>
      <h5>문제 갯수, 출제 범위, 힌트 여부를 선택해주세요</h5>
      <form action="/quiz" method="GET">
        <p>문제 갯수</p>
        <div>
          <input
            type="number"
            name="count"
            id="count"
            required
            defaultValue={10}
          />
          <label htmlFor="count">개</label>
        </div>
        <br />
        <p>출제 범위 (업데이트 예정)</p>
        {/* {GENERATION.map((item) => (
          <div key={item}>
            <input
              type="checkbox"
              name="generation"
              id="generation"
              value={item}
              defaultChecked
            />
            <label>{item}세대</label>
          </div>
        ))} */}
        {/* <div>
          <input type="checkbox" name="final" id="final" />
          <label htmlFor="final">최종 진화형만</label>
        </div>
        <br /> */}
        <p>힌트 여부 (업데이트 예정)</p>
        {/* <div>
          <input type="checkbox" name="gen" id="gen" defaultChecked />
          <label htmlFor="gen">세대 힌트</label>
        </div>
        <div>
          <input type="checkbox" name="type" id="type" defaultChecked />
          <label htmlFor="type">타입 힌트</label>
        </div>
        <br /> */}
        <button type="submit">문제 풀러 가기</button>
      </form>
    </>
  );
}
