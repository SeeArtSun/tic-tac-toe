# Huiseoul 개발환경 적응기
`Huiseoul` 플랫폼팀에 합류했습니다. 이전에 사용하던 Spring Framework + RDB와 전혀 다른 개발 환경속에서 팀원들의 많은 도움을 받으며 적응중입니다.

`Huiseoul`은 front 개발환경으로 컴포넌트 재사용에 용이한 `React`, React state를 관리하기 위한 `MobX`, Type에 관대한 JavaScript를 사용할 때 발생할 수 있는 미연의 오류를 방지하고 명확한 코드 작성이 가능한 `TypeScript`를 사용하고 있습니다.

이 글에서는 [React 공식 tutorial](https://facebook.github.io/react/tutorial/tutorial.html)인 React tic-tac-toe에 state container인 `Redux`를 입히는 과정을 다루겠습니다.

## 왜 MobX가 아니라 Redux였나?
annotation과 decorator를 사용하여 알아서 해주는게 많은 MobX보다 React만을 사용했을 때에 비해 구조 변화가 필요한 Redux가 State Management Library를 이해하는데 좀 더 용이하다고 판단했습니다.
`React-Redux` 조합이 널리 사용되고 있어, 참고할 수 있는 자료가 많다는 것도 초심자에게는 중요한 포인트였습니다.

## React?
React를 가장 정확하고 잘 설명한 곳은 역시 [React 공식페이지](https://facebook.github.io/react/) 입니다.
따라서 React를 접하면서 중요한 개념들이라고 생각했던 부분들만 간략히 정리하겠습니다.
- Facebook이 만들고 사용하고 있습니다.
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

## Redux with React
### Redux?
`Redux`는 `state management library`입니다. Framework 아니고 library입니다.


앞서 React가 MVC(Model-View-Controller) 패턴에서 V에 해당하는 View에 집중했다고 언급했습니다.

MVC은 이렇게 생겼습니다.

![Simple MVC](./simple_mvc.png)

여기서 View가 많아지면 어떻게 될까요?

![Complex MVC](./complex_mvc.png)

View & View 가 추가될 때 마다 복잡도가 증가하고, 프로젝트 규모가 기하급수적으로 늘어납니다. 점차 각 Model & View의 관계도 파악하기 어려워 지고요.

이런 MVC 단점을 보완해줄 수 있는 패턴이 Flux입니다.

