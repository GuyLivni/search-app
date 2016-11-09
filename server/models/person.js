var searchData;

module.exports = function () {

    function setSearchData(data) {
        searchData = data;
    }

    function getPerson(name, phone, age, pageSize, pageIndex) {
        var persons = [];
        var result  = [];

        searchData.forEach(function (person) {
            if (matchPerson(person, name, age, phone)) {
                persons.push(person);
            }
        });

        var personsSize = persons.length;

        result = personsSize == 0 ? persons : persons.slice((pageIndex - 1) * pageSize, Math.min((pageSize * pageIndex), personsSize));

        return {
            data:  result,
            total: personsSize
        }
    }

    function matchPerson(person, name, age, phone) {
        //Check if name does not match
        if (name && !person.name.toLowerCase().includes(name.toLowerCase())) {
            return false;
        }

        //Check if phone does not match
        if (phone && !person.phone.replace('-','').includes(phone.replace('-',''))) {
            return false;
        }

        //Check if age does not match
        if (age) {
            var personAge = new Date().getFullYear() - new Date(person.birthday * 1000).getFullYear();
            if (personAge != age) {
                return false;
            }
        }

        return true;
    }

    return {
        setSearchData : setSearchData,
        getPerson     : getPerson
    }
};