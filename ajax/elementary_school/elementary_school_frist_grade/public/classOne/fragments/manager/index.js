fetch("http://localhost:3002/classOne/api/person.json")
    .then((res) => res.json())
    .then((manager) => {
        document.querySelector(
            "#class-one-manager .manager"
        ).innerHTML = manager
            .map((manager) => {
                return `<div><p>${manager.name}</p></div>`;
            })
            .join("");
    });
