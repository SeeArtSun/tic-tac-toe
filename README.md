commit 과정은 [medium post](https://engineering.huiseoul.com/react-redux-tic-tac-toe-4a773928c425)에서 볼 수 있습니다.

# [React Tic-Tac-Toe Tutorial](https://facebook.github.io/react/tutorial/tutorial.html)
- 컴포넌트 기반의 프레임워크 구조를 이해하기 좋은 예

# React.js
- Facebook이 만들고 사용한다.
- JUST THE UI(컴포넌트 기반): MVC 모델에서 View를 컴포넌트로 만들어 User-interaction에 좀 더 집중하기 위한 라이브러리
- VIRTUAL DOM: 지속적으로 데이터 변화를 감지하여 View에 반영  
> - 실제 DOM에 접근하여 조작하는 대신에 이를 추상화 시킨 JavaScript 객체를 구성하여 사용  
> - 데이터가 변경되면 UI를 Virtual DOM에 렌더링 한 후 이전 Virtual DOM과 비교하여 바뀐 부분만 실제 DOM에 적용
- DATA FLOW(단방향): 모든 데이터모델을 단일 루트에서 시작하는 계층 구조로 사용

### React.js 컴포넌트
- render: 하나의 컴포넌트만을 return한다.(복수 컴포넌트 return 금지)
```
// NO
render() {
   return (
     <div>title</div>
     <div>contents</div>
   );
}

// OK
render() {
  return (
    <div>
      <div>title</div>
      <div>contents</div>
    </div>
  );
}
```
- 컴포넌트 간의 상호작용 : `props`를 통해 컴포넌트 간 I/F한다.
- 동적으로 갱신 : User-Interaction을 통해 값이 동적으로 변화하는 경우 `state` 사용(`this.setState`)

## Redux with React
- MVC 패턴을 적용했을 때 프로젝트 규모가 기하 급수적으로 커지는 단점을 보완  
![MVC](http://blog.coderifleman.com/assets/img/2015/mvc-does-not-scale-use-flux-instead/flux_architecture.01.png)  
- MVC 단점을 보완해줄 수 있는 Flux 패턴  
![Flux](http://blog.coderifleman.com/assets/img/2015/mvc-does-not-scale-use-flux-instead/flux_architecture.02.png)
- 결국 Redux는 Flux 구조를 좀 더 쉽고 정돈된 형태로 쓸 수 있게 해주는 라이브러리
- JavaScript Application에서 data-state 와 UI-state를 관리해주는 도구
- 설치
```
$ npm install --save redux
or
$ yarn add redux react-redux
/*
 react-redux: redux를 컴포넌트 상에서 더 간편하게 사용 할 수 있게 해 주는 라이브러리. 컴포넌트에서 store 를 props 으로 받아오거나, subscribe 를 직접 할 필요가 없음
*/
```
- `Action` 정의: 일어날 상황을 정의 하여 상태를 변화시키는 역할
- `Reducer` 정의: 액션이 상태를 어떻게 변경할지 정의
> - Action의 결과가 Reducer로 분배됨  
> - Redux가 새로운 state를 계산하는데 쓰는 함수
- `Store`를 만들고 React와 연계: 앱의 상태를 정의
> 1. store를 만듭니다.  
> 2. redux.Provier로 전체 앱을 한번 감싸줍니다.  
> 3. state를 props로 받기 위해 의 정의를 새로 합니다. 변환 함수를 작성 한 뒤 redux.connect를 이용합니다. export default connect(f)(App)꼴로 사용합니다.
- Key Point
> State is read-only : state는 직접변경할 수 없다. 대신 action을 dispatch하여 state를 변경한다. 해당 로직은 reducer에 있다.

