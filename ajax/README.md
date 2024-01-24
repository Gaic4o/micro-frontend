# AJAX 를 사용한 Micro frontend 

Fetch API 사용 : Javascript 사용하여 Fetch API 를 호출합니다. 이 API 는 웹 서버에 HTML 파일을 요청 후,
서버는 요청된 HTML 파일을 응답으로 보냅니다.

``` javascript
fetch('url-file')
    .then(response => response.text()) 
    .then(html => {
        // 여기서 html 변수는 가져온 HTML 내용을 담고 있습니다.
    } 
```

가져온 HTML 을 DOM 에 삽입 : DOM 을 조작하여, Javascript 를 사용해 가져온 HTML 내용을 기존 페이지의 특정 위치에 삽입.
이렇게 함으로, 전체 페이지를 가져오는 것이 아니라, 가져오는 특정 부분만 가져와 변경하면서, 새로운 내용을 표시할 수 있습니다. 

``` javascript
// innerHTML 속성을 사용 해 새로운 HTML 내용을 페이지에 삽입합니다. 
document.getElementById('some-element').innerHTML = html; 
```

project 에서는 fetch 를 이용하여, 다른 서버에서 HTML 을 받아오고 페이지를 추가하는 형식으로 되어 있습니다. 

elementary_school_main 정적 파일을 제공하는 웹 서버 localhost:3001 
elementary_school_first_grade 정적 파일을 제공하는 웹 서버 localhost:3002
pnpm 으로 main, first_grade 를 생성 해 줍니다. 

팀별로 독립적으로 운영하면서, 각 팀마다 개발하는 부분을 담당 해 관리를 합니다.
-> 예로 한 팀은 Header, 다른 팀은 Footer, Body ... 개발을 하게 됩니다. 

각 팀은 HTML 파일을 별도의 서버나 경로에 배치할 수 있습니다. 
이렇게 하면 각 팀은 자신의 코드를 독립적으로 업데이트 하거나 관리할 수 있습니다. 




