const currencyTable = document.querySelector(".currencyTable");
const tbody = currencyTable.querySelector("tbody");

const arrayRequest = {
  periodicity: 0,
};

fetch(
  `https://www.nbrb.by/api/exrates/rates?${Object.keys(arrayRequest)[0]}=${
    arrayRequest[Object.keys(arrayRequest)[0]]
  }`
)
  .then((response) =>
    response.ok
      ? response.json()
      : Promise.reject("is not ok: " + response.status)
  )
  .then((data) => {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];

        createContent(
          element.Cur_Abbreviation,
          element.Cur_Name,
          element.Cur_OfficialRate,
          element.Cur_Scale
        );
      }
    }
  })
  .catch((err) => {
    console.warn(err);
  });

const createContent = (
  Cur_Abbreviation,
  Cur_Name,
  Cur_OfficialRate,
  Cur_Scale
) => {
  trTag = document.createElement("tr");
  tbody.append(trTag);

  tdCurName = document.createElement("td");
  tdCurName.classList.add("curName");
  trTag.append(tdCurName);

  divTdCurName = document.createElement("div");
  divTdCurName.classList.add("country");
  tdCurName.append(divTdCurName);

  spanDivTdCurName = document.createElement("span");
  spanDivTdCurName.classList.add("text");
  spanDivTdCurName.innerText = `${Cur_Name}`;
  divTdCurName.append(spanDivTdCurName);

  tdСurAmount = document.createElement("td");
  tdСurAmount.classList.add("сurAmount");
  tdСurAmount.innerText = `${Cur_Scale} ${Cur_Abbreviation}`;
  trTag.append(tdСurAmount);

  tdCurCours = document.createElement("td");
  tdCurCours.classList.add("curCours", "align-right");
  trTag.append(tdCurCours);

  divTdCurCours = document.createElement("div");
  divTdCurCours.textContent = `${Cur_OfficialRate}`;
  tdCurCours.append(divTdCurCours);
};
