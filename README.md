# lemon-typescript-template [![Build Status](https://travis-ci.com/louis-lemon/lemon-typescript-template.svg?branch=develop)](https://travis-ci.com/louis-lemon/lemon-typescript-template) [![codecov](https://codecov.io/gh/louis-lemon/lemon-typescript-template/branch/develop/graph/badge.svg)](https://codecov.io/gh/louis-lemon/lemon-typescript-template)

# Done
- eslint
- prettier
- editorconfig
- gitignore
- nvmrc
- testing(jest)
- tsconfig
- husky & lint-staged
- travis-ci
- codecov
- typedoc
- npm module(publish)

# Prerequisite

### nodemon

```sh
$ npm install -g nodemon
```

### nvm

```sh
$ nvm use
Found '/Users/tak/workspace/lemoncloud/api/lemon-typescript-template/.nvmrc' with version <8.10.0>
Now using node v8.10.0 (npm v5.6.0)
```

----

# How to use

### Installation

```sh
$ npm install
```

### Build for typescript

```sh
$ npm run build
```

### Development

```sh
$ npm start
```

### Test

```sh
$ npm test
$ npm run dev:test # 개발할 때 사용, --watchAll 추가
```

### Lint

```sh
$ npm run lint
```

### Publish to npm(module)

```sh
$ npm login
Username:

$ npm publish
```

### Documentation

```sh
$ npm run doc
$ npm run doc:publish # gh-pages 만들기
```

---

# Travis-CI 설정 [![Build Status](https://travis-ci.com/louis-lemon/lemon-typescript-template.svg?branch=develop)](https://travis-ci.com/louis-lemon/lemon-typescript-template)

- [travis-ci](https://travis-ci.com)에서 github로 sign-up 및 계정 access 허용
- .travis.yml 파일 추가
- push or pull request 날려보기
- 아래 이미지처럼 나와야함

![travis-build](https://user-images.githubusercontent.com/46361622/57597834-ebe3f580-758b-11e9-9903-baaff55a8362.png)


## 뱃지다는 법
- traivs-ci repository의 이름 옆에 있는 뱃지 클릭
- 브랜치 및 URL 형식 설정(여기서는 Markdown)

![travis-badge](https://user-images.githubusercontent.com/46361622/57597832-eb4b5f00-758b-11e9-8313-39b3533ad91d.png)

- 링크 복사 및 README.md에 추가

> 2019.05.13: lemoncloud-io에서 travis-ci 권한 얻을 수 없어서 fork 뜬 후에 louis repo에서 진행

---

# Codecov [![codecov](https://codecov.io/gh/louis-lemon/lemon-typescript-template/branch/develop/graph/badge.svg)](https://codecov.io/gh/louis-lemon/lemon-typescript-template)

- jest와 [codecov](https://codecov.io)를 이용하여 테스트코드의 코드 커버리지를 리포트할 수 있다.
- travis-ci처럼 codecov에 github로 로그인하여 repository와 sync한다.

## Install codecov

```
$ npm install --save-dev codecov
```

## Report coverage

```bash
$ npm run test
# 위 명령어 실행 후, coverage 폴더가 생성된다.
$ ./node_modules/.bin/codecov --token="....." # token은 codecov에서 확인가능하다.
```

## travis-ci와 연동

- .travis.yml 파일에서 env 및 after_success 설정해준다.

---

# TODO
- [ ] Setup serverless

# Setup

```sh
$ nvm use
$ npm init 
$ npm install --save body-parser cors dotenv express morgan serverless-http winston
$ npm install --save-dev typescript ts-jest serverless nodemon jest husky concurrently
$ npm install --save-dev @types/cors @types/dotenv @types/jest @types/morgan @types/winston

# eslint, prettier
$ npm install eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
$ npm install prettier eslint-config-prettier --save-dev
$ npm install @types/supertest --save-dev
```

# VSCode plugins

- [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [eslint](https://github.com/Microsoft/vscode-eslint)
- [prettier](https://github.com/prettier/prettier-vscode)

# How to setup VSCode

- eslint, prettier plugin 설치
- vscode의 ```settings.json``` 오픈 후 아래 코드 추가
```json
    ...

    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "prettier.eslintIntegration": true,
    "javascript.format.enable": false,
    "eslint.autoFixOnSave": true,
    "[javascript]": {
        "editor.formatOnSave": false,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.formatOnSave": false,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.formatOnSave": false,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.formatOnSave": false,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    ...
```
