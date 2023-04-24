type sucessValue = "성공 함수에 넘길 값";
type reason = "실패한 이유(에러)";
type 어_서버파일_쓰기_성공_했을_때_실행시킬_함수 = (value: sucessValue) => void;
type 어_서버파일_쓰기_실패_했을_때_실행시킬_함수 = (err: reason) => void;

interface serverResponse {
    writeOk: boolean | undefined;
    writeFailed: boolean | undefined;
}

// Promise 예시
// 콜백 함수의 개념은 단순하다. 하나의 함수 안에서 다른 함수를 인자로 넘겨 호출하도록 하는 함수를 가르켜 콜백함수라고 한다.
// 콜백 함수의 개념을 안다는 가정하고 시작
// 콜백 함수를 비롯해서 비동기 처리 작업은 너가 알고 있는대로 자바스크립트를 실행시키는 환경(런타임)에서 순서대로 진행시킬 수 없는 코드를 동작하게 하는 방법이다.

// # 비동기 처리를 사용해야하는 대표적인 경우 두 가지.
// (1) 예를 들어 사용자가 크롬 브라우저로 네이버에 접속한다 했을 때, 천재지변으로 네이버 서버가 다운되어 있을 수 있다.
// 이때 사용자측(클라이언트) 쪽 코드에 서버가 어떤지 확인 안하고 실행시키는 코드를 단순히 넣어버리면 서버에서 정보를 받아올 수 없기 때문에
// 사용자측 브라우저가 그냥 멈춰버릴 수도 있다.

// (2) 아니면 서버 컴퓨터가 구려서 데이터를 보내주는 시간이 상대적으로 늦을 수 있다.
// 이때 이 지연시간을 고려하지 않고 비동기 처리 없이 동기적인 처리를 해버리면 데이터가 다 올때까지 유저는 다음코드가 실행될 때까지 기다려야 한다.

// 모든 비동기 처리는 이렇게 훗날 처리해야하는 값이 뭔지 확정적이지 않을 경우(true or false? or any)
// 그리고 처리해야 하는 일이 있는데 그 일이 얼마나 오랜시간이 걸릴지 정확히 예측할 수 없는 경우에 사용한다.

// # code example
// 사용맥락 : 고객이 입력한 정보를 서버에 잠시 보관할 수 있도록 서버측 컴퓨터에 파일로 남기고 싶다.

const serverStatus: serverResponse = {
    writeOk: undefined,
    writeFailed: undefined,
};

const getServerStatus = () => {
    console.log("ok");
}; // 대충 서버의 상태를 가져오는 함수라고 치셈, 지금 예시에선 서버 상태가 멀쩡하면 파일 쓰기 동작이 가능하다고 가정
// 상태 여부에 따라서 위에 serverStatus 객체의 프로퍼티 값이 true | false로 바뀜
getServerStatus();

const yourPromise = new Promise(
    (
        resolve: 어_서버파일_쓰기_성공_했을_때_실행시킬_함수,
        reject: 어_서버파일_쓰기_실패_했을_때_실행시킬_함수
    ) => {
        // 여기에 Promise 객체가 실행시킬 동작들이 들어가는 것
        // 여기서 성공 케이스와 실패 케이스 하나씩 예를 들어 보겠음
        // 서버 상태가 멀쩡하다 했을 때 파일 쓰는 작업을 함
        if (serverStatus.writeOk) {
            resolve("성공 함수에 넘길 값");
        } else {
            // serverStatus.writeFiled
            reject("실패한 이유(에러)");
        }
    }
);

// yourPromise 처럼 프로미스는 만드는 동작 하나, 만든 프로미스를 사용하는 동작 하나 이렇게 두 가지 방면으로 나뉘어짐
// yourPromise에서 만드는 동작은 완료
// 아래처럼 만든 Promise 객체를 사용하면 ok
yourPromise //
    .then(/*("성공 함수에 넘길 값") => {처리}*/) // 여기에 resolve 함수에 넘긴 값이 그대로 들어온다.
    .catch(/*("실패한 이유(에러)") => {처리}*/) // 여기에 reject 함수에 넘긴 값이 그대로 들어온다.
    .finally(); // 여기에 Promise의 상태가 뭐 우째됐던 간에 실행시킬 처리를 넣는다

// 사람은 숫자를 셀 때 하나부터 열까지 순서대로 센다. 하지만 컴퓨터는 하나 세고 셋 한다음 일곱 세고 둘을 세서 하나부터 열까지 세는 작업을
// 할 수 있다. 이 차이가 비동기 처리를 이해하기 힘든 개념으로 보이게 만든다.
// 단순히 이런 예시로 보면 개념 자체가 추상적이기 때문에 이해하기 힘들긴 하다.
// 실제로 단순히 코드 예제를 만드는 것보다 훗날 서버를 직접 구동할 수 있게 되면, Promise를 활용해 보자. 직관적으로 어떤 코드를 써야 하는지 더 확실하게 알 수 있을 것이다.