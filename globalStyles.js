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
    listIcon: '#26B'
};

const colorsSecondary = {
    one: '#AFD275',
    two: '#C2B9B0',
    three: '#C2CAD0',
    four: '#7E685A',
    five: '#E7717D',
};

export default globalStyles = {
    colors,
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