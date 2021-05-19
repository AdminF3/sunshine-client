export default function calc(tables) {
    let numberOfFields = 0;

    Object.values(tables).forEach((table, index) => index !== 4 &&
        Object.values(table).forEach((elements, indexElements) =>
            indexElements % 2 === 1 && elements.forEach((element) =>
                element.forEach((_, indexEl) => indexEl !== 0 ? numberOfFields++ : '')
            )
        )
    );

    let counterAnnex3 = 0;

    Object.values(tables).forEach((table, index) => index !== 4 &&
        Object.values(table).forEach((elements, indexElements) =>
            indexElements % 2 === 1 && elements.forEach((element) =>
                element.forEach((el, indexEl) => indexEl !== 0 ? el !== '' ? counterAnnex3++ : '' : '')
            )
        ));

    const resultInPercentage = (counterAnnex3 / numberOfFields) * 100;

    return { numberOfFields, counterAnnex3, resultInPercentage };
}