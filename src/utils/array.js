export const GroupByTagName = (data, groupName) => {
    let newData = [];

    data.forEach(element => {
        if( !element[ groupName ] ) return;

        if( !(newData[ element[groupName] ] instanceof Array))
            newData[ element[groupName] ] = [];

        newData[ element[groupName] ].push( element );
    });

    return newData.filter( n => n != undefined);
}

export const ByGroupByData = (group, data, groupName) => {
    let newData = [];

    group.forEach(no => {   
        newData[no.toString()] = data.filter(d => d[ groupName ] == no);
    });

    return newData.filter( n => n != undefined);
}