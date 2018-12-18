const macroColors = {
    protein: '#D66',
    fat: '#DA4',
    carbs: '#59B',
}

const colors =  {
    one: '#F78888',
    two: '#F3D250',
    three: '#ECECEC',
    four: '#90CCF4',
    five: '#5DA2D5',
};

const colorsSecondary = {
    one: '#314455',
    two: '#644E5B',
    three: '#97AABD',
    four: '#9E5A63',
    five: '#C96567',
};

export default globalStyles = {
    colors: {
        one: colors.one,
        two: colors.two,
        three: colors.three,
        four: colors.four,
        five: colors.five,
    },
    color: '#000',
    backgroundColor: colors.three,
    // Because of pie chart, must use only colors by #XXXXXX
    proteinColor: macroColors.protein,
    carbColor: macroColors.carbs,
    fatColor: macroColors.fat,
    //
    menuColor: {
        macros: colors.five,
        workouts: colorsSecondary.five
    }
}