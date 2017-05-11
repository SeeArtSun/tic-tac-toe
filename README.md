# Tic-Tac-Toe
A great example of component-based architecture.

## React.js
* 모든 데이터 모델을 단일 루트에서 시작하는 계층 구조로 반드는 것
* 데이터의 변화를 감지하여 뷰에 반영하는 것

## Redux with React
* Redux의 특징은 어플리케이션 state에 대한 각각의 변화가 context 에서 전달되는 messages action을 통해 발생한다는 것
* Reducer: Rudux가 새로운 state를 계산하는데 쓰는 함수
* 설치
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
> Action의 결과가 Reducer로 분배됨
- `Store`를 만들고 React와 연계: 앱의 상태를 정의
> 1. store를 만듭니다.  
> 2. redux.Provier로 전체 앱을 한번 감싸줍니다.  
> 3. state를 props로 받기 위해 의 정의를 새로 합니다. 변환 함수를 작성 한 뒤 redux.connect를 이용합니다. export default connect(f)(App)꼴로 사용합니다.

Here’s the reducer (a function that Redux uses to compute new state based on the action taken).

<App>
  <Result />
  <Board>
   <-- <Blank>, <X> and <O> components here, depending on the data model-->
  <Board />
</App>


<Game>
  <Board>
    <Square>
    </Square>
  </Board>
  <Status />
</Game>
