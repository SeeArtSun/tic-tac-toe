# Huiseoul 개발환경 적응기
`Huiseoul` 플랫폼팀에 합류했습니다. 이전에 사용하던 Spring Framework + RDB와 전혀 다른 개발 환경속에서 팀원들의 많은 도움을 받으며 적응중입니다.

`Huiseoul`은 front 개발환경으로 컴포넌트 재사용에 용이한 `React`, React state를 관리하기 위한 `MobX`, Type에 관대한 JavaScript를 사용할 때 발생할 수 있는 미연의 오류를 방지하고 명확한 코드 작성을 위해 `TypeScript`를 사용하고 있습니다.

이 글에서는 [React 공식 tutorial](https://facebook.github.io/react/tutorial/tutorial.html)인 React tic-tac-toe에 state container인 `Redux`를 입히는 과정을 다루겠습니다.

## 왜 MobX가 아니라 Redux였나?
MobX는 annotation과 decorator를 사용하여 알아서 해주는게 많기 때문에 눈에 보이는 구조 변화가 필요한 Redux가 State Management Library를 이해하는데 좀 더 용이하다고 판단했습니다.
`React-Redux` 조합이 널리 사용되고 있어, 참고할 수 있는 자료가 많다는 것도 초심자에게는 중요한 포인트였습니다.

## React?
React를 가장 정확하고 잘 설명한 곳은 역시 [React 공식페이지](https://facebook.github.io/react/) 입니다.
따라서 구구절절한 이야기들은 생략하고, React를 접하면서 중요한 개념들이라고 생각했던 부분들만 간략히 정리하겠습니다.
- Facebook이 만들고 사용하고 있습니다.
- View의 변화가 찾은 페이지에 적합합니다.
- JUST THE UI(컴포넌트 기반)
> - MVC 모델에서 View를 Component로 만들어 User-Interaction에 집중했습니다.
> - Component 재사용에 용이합니다.
- VIRTUAL DOM
> - React Virtual-Dom이 지속적으로 Component 내부의 데이터를 변화감지하여 변경된 부분만 View에 적용될 수 있도록 합니다.
> - 필요한 부분만 변경하기 때문에 빠릅니다.
> - 사용자는 데이터 변화보다 UI에 좀 더 집중할 수 있습니다.
> - 실제 DOM에 접근하여 조작하는 대신에 이를 추상화 시킨 JavaScript 객세를 구성하여 동작하며 데이터가 변경되면 UI를 Virtual DOM에 렌더링 한 후 이전 Virtual DOM과 비교하여 바뀐 부분만 실제 DOM에 반영하는 방식입니다.
- 단방향 DATA FLOW
> - 모든 데이터 모델을 단일 Root에서 시작하여 계층 구조로 사용합니다.
> - 따라서 데이터 흐름이 명시적입니다.

## Redux?
### Flux?
`Redux`를 더 쉽게 이해하기 위해 잠시 `Flux 패턴`에 관해 설명하겠습니다.

앞서 React가 MVC(Model-View-Controller) 패턴에서 V에 해당하는 View에 집중했다고 언급했습니다.

MVC은 아래 그림과 같은 패턴입니다.

![Simple MVC](./simple_mvc.png)

여기서 View가 많아지면 어떻게 될까요?

![Complex MVC](./complex_mvc.png)

Model & View 가 추가될 때 마다 복잡도가 증가하고, 프로젝트 규모가 기하급수적으로 늘어납니다. 점차 각 Model & View의 관계도 파악하기 어려워 지고요.

이런 MVC 단점을 보완해줄 수 있는 패턴이 `Flux`입니다.

![Flux](./flux_with_action.png)

Flux 패턴에서 `Store`는 어플리케이션의 모든 데이터 변화를 담고있습니다. `Action`이 발생했을 때, `Dispatcher`는 `Store`를 어떻게 갱신할지 결정합니다. 이 후 `Store`가 변경되면 `Store` 내부의 데이터도 바뀌므로 `View`도 갱신됩니다. 정리하자면, `Dispatcher`가 `Action`으로 인한 데이터 변경로직을 결정하면 `Store`에 변경된 데이터가 쌓여 `View`도 갱신해주는거죠.


### Redux?

`React-Redux`에 대해 알아보자고 하고, `Flux 패턴`에 관한 설명이 길어졌는데요, 결국 Redux는 Flux 패턴을 좀 더 쉽고 정돈된 형태로 쓸 수 있게 도와주는 라이브러리입니다.

`Redux`는 `state management library`입니다. Framework 아니고 library입니다. JavaScript Application에서 Data-state와 UI-state를 관리해주는 도구입니다.

`Redux`에서 중요한 개념은 크게 3가지 입니다.

- Action
- Reducer
- Store

#### Action
`Action`에서는 상태변화가 있을법한 상황들을 미리 정의합니다.

#### Reducer
그럼 `Reducer`에 `Action`이 일어났을 때 어떻게 상태를 바꿔줄지 로직을 담습니다.
> - Action의 결과가 Reducer로 분배되고,
> - Redux가 새로운 state를 계산하는데 쓰입니다.

#### Store
변경된 상태들은 `Store`에 담기게 됩니다. 이 때, `Store` 내부의상태 변화에 따라 `View`도 함께 변화해야하기 때문에 `Store`와 `View`를 연결해줄 필요가 있습니다. React에서는 Component가 되겠죠.

연결과정은 다음과 같습니다.
> 1. 최상위 React Component에(ex. root)에 store를 만듭니다.
> ```
> import { createStore } from 'redux';
> ...
> store = createStore(reducer);
> ```
> 2. Provider로 전체 앱을 한 번 감싸줍니다.
> ```
> import { Provider } from 'react-redux';
> ...
> ReactDOM.render(
>   <Provider store={store}>
>     <App />
>   </Provider>,
>   document.getElementById('app');
> );
> ```
> 3. Provider Component가 제공하는 connec()함수를 이용하여 Component와 store를 연결한다.
> ```
> import { connect } from 'react-redux';
> ...
> // component의 props에 매핑할 상태를 정의
> // 기존 React Component 내부의 constructor()
> const mapStateToProps = (state) => ({
>   myState: state.myState,
>   ...
> });
>
> // dispatcher를 component의 props에 매핑
> const mapDispatchToProps = (dispatch) => ({
>   yourReducerFunction(index) {
>     dispatch(yourReducerFunction(index));
>   },
>   ...
> });
>
> // 연결!!
> export default connect(mapStateToProps, mapDispatchToProps)(YourComponent);
> ```

## React with Redux?

이제 [`React Tic-Tac-Toe Tutorial`](https://facebook.github.io/react/tutorial/tutorial.html)에 `Redux`를 입혀봅시다.
[`최종결과를 확인하고 코드를 fork하세요.`](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)

### Step1. React Component 분리
Tutorial 최종 결과에서 중요한 코드는 [`index.js`](https://gist.github.com/SeeArtSun/261f398b3b9eb430e450ff8dc9fe2a96) 뿐입니다.
하지만 이 파일에는 Tic-Tac-Toe 놀이판의 한 칸 한 칸에 해당하는 `Square Component`, 놀이판에 해당하는 `Board Component`, 전체 게임을 관리하는 `Game Component` 가 모두 담겨있습니다.
해서 이 Component들을 각각의 파일로 분리하겠습니다.

https://gist.github.com/SeeArtSun/c2ed113c622a6c6161ead0e76cac2409
