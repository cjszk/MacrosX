const colors =  {
    one: '#F78888',
    two: '#F3D250',
    three: '#ECECEC',
    four: '#90CCF4',
    five: '#5DA2D5',
}

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
    proteinColor: colors.one,
    carbColor: colors.four,
    fatColor: colors.two,
    //
    menuColor: {
        macros: colors.five,
        workouts: colors.five
    }
}