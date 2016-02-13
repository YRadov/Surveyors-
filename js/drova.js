//************************************************
//*******ПЕРЕМЕННЫЕ*******************************
//************************************************
//Длина загружаемого леса
var Len = 0;
//Номер бревна попорядку
var N = 1;
//Диаметр бревна
var D = 0;
//Объем бревна заданного диаметра
var V = 0;
//Общий объем загруженных бревен
var totalV = 0;
$('#total_val').val(0);
//Максимальный объем
var maxV = 36600;
$('#max-val').val(36600);
//Осталось загрузить
var restVal = 0;
$('#max-val-rest').val($('#max-val').val());
//Общий массив загрузки
var Partia = [];


//Массивы соответствий D:V для разных длин
var L_3_8 = [];
var L_5_8 = [];

//************************************************
//*******ФУНКЦИИ**********************************
//************************************************

//Вывод всех параметров
function showParam(){
    console.log (
        'Len = ' + Len + '\n' +
        'N = ' + N  + '\n' +
        'D = ' + D + '\n' +
        'V = ' + V + '\n' +
        'totalV = ' + totalV  + '\n'
    );
}

//Показ сообщений
function errorMessages(message){
    $('.error').text(message).fadeIn().delay(2000).fadeOut();
}

//Сброс всех параметров
function allReset()
{
    Len = 0;
    N = 1;
    D = 0;
    V = 0;
    totalV = 0;
    $('#total_val').val(0);
    maxV = 36600;
    $('#max-val').val(36600);
    restVal = 0;
    $('#max-val-rest').val($('#max-val').val());

}
//************************************************
//*******ПРОГРАММА********************************
//************************************************

//Выбор длины загружаемого леса
$('.choose-len-btn').click(function(){
    $('.fa-check').css('opacity','0');
    $(this).prev('i').css('opacity','1');
    Len = $(this).attr('len');

    //Обнуление диаметра и объема для ввода с новой длиной
    $('#diam').val('');
    $('#val').val('');
    D = 0;
    V = 0;

    //showParam();
});
//******************************************************

//Ввод диаметра следующего бревна
$('#diam').keyup(function(){

    var temp_diam = $(this).val();
    //Пропускаем только четные значения
    if( !(temp_diam%2) )
    {
        D = $(this).val();
        //Расчет объема текущего бревна
        switch (Len)
        {
            case '38':
                V = L_3_8[D];
                break;
            case '58':
                V = L_5_8[D];
                break;
        }

        //Выводим объем текущего бревна
        if(V)
        {
            $('#val').val(V+'cм3');
        }
        else if(D < 0 || D > 9)
        {
            errorMessages('НЕТ ДАННЫХ ДЛЯ ДИАМЕТРА');
        }
    }


    //showParam();

});
//******************************************************

//Ввод данных следующего бревна
$('#enter-diam').click(function(){
    //при пустом диаметре не срабатывает
    if(D >= 12 && Len > 0 && typeof V != "undefined")
    {

        //Расчет общего объема
        totalV += V;
        $('#total_val').val(totalV + ' cм3');

        //Печать таблицы результатов(ASC)
        //$('.table-res').append(
        //    '<tr>'+
        //    '<td>'+N+'</td>'+
        //    '<td>'+Len/10+'</td>'+
        //    '<td>'+D+'</td>'+
        //    '<td>'+V+'</td>'+
        //    '<td>'+totalV+'</td>'+
        //    '<td><i class="fa fa-minus-square del"></i></td>'+
        //    '</tr>'
        //    );

        //Осталось загрузить
        maxV = $('#max-val').val();
        restVal = maxV - totalV;
        $('#max-val-rest').val(restVal);

        //добавляем данные по текущему бревну в массив
        Partia[N]= {
            "L": Len/10,
            "Diam": D,
            "Val": V
        };
        //console.log (
        //    N + ' '
        //    +Partia[N]['L'] + ' '
        //    +Partia[N]['Diam'] + ' '
        //    +Partia[N]['Val'] + '\n'
        //);

        $('.table-res tr td').remove();

        //Вывод результатов в таблицу(DESC)
        for(var i=N; i > 0; i--)
        {
            $('.table-res').append(
                '<tr>'+
                '<td>'+i+'</td>'+
                '<td>'+Partia[i]['L']+'</td>'+
                '<td>'+Partia[i]['Diam']+'</td>'+
                '<td>'+Partia[i]['Val']+'</td>'+
                '<td>' +'totalV'+'</td>'+
                '<td><i class="fa fa-minus-square del"></i></td>'+
                '</tr>'
            );
        }//for

        //Номер бревна по порядку
        N++;
        $('.num').text('№ ' + N );

        //Обнуление диаметра и объема для следующего ввода
        $('#diam').val('');
        $('#val').val('');
        D = 0;
        V = 0;

        //фокус на поле ввода
        $('#diam').focus();
    }
    else
    {
        D = 0;
        V = 0;

        if(Len == 0)
            errorMessages('НЕ ВЫБРАНА ДЛИНА');
        else
            errorMessages('НЕПРАВИЛЬНЫЙ ДИАМЕТР');
    }


    //showParam();

});
//******************************************************

//Изменение максимального объема
$('#max-val').keyup(function(){
    maxV = $('#max-val').val();
    restVal = maxV - totalV;
    $('#max-val-rest').val(restVal);
});
//******************************************************

//Новый контейнер
$('#next-cont').click(function(){
    result = confirm('Все данные будут удалены. Продолжить?');
    if(result)
    {
        //очистка таблицы
        $('.table-res tr td').remove();
        //очистка всех параметров
        $('.fa-check').css('opacity','0');
        allReset();
    }
});


//************************************************
//*******РАЗНОЕ***********************************
//************************************************

//Скролл вверх
$('.to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);
    return false;
});

//************************************************


L_3_8 = {
    "14":68,
    "16":90,
    "18":113,
    "20":139,
    "22":170,
    "24":200,
    "26":240,
    "28":270,
    "30":310,
    "32":360,
    "34":410,
    "36":460,
    "38":510,
    "40":550,
    "42":610,
    "44":670,
    "46":730,
    "48":790,
    "50":860,
    "52":940,
    "54":1020,
    "56":1100,
    "58":1180,
    "60":1270,
    "62":1350,
    "64":1440,
    "66":1530,
    "68":1620,
    "70":1710,
    "72":1810,
    "74":1910,
    "76":2020,
    "78":2120,
    "80":2230,
    "82":2350,
    "84":2460,
    "86":2580,
    "88":2700,
    "90":2830,
    "92":2960,
    "94":3080,
    "96":3220,
    "98":3350,
    "100":3490
};

L_5_8 = {
    "14":118,
    "16":149,
    "18":186,
    "20":220,
    "22":270,
    "24":320,
    "26":380,
    "28":430,
    "30":500,
    "32":570,
    "34":640,
    "36":710,
    "38":790,
    "40":870,
    "42":960,
    "44":1050,
    "46":1150,
    "48":1250,
    "50":1360,
    "52":1470,
    "54":1590,
    "56":1710,
    "58":1840,
    "60":1970,
    "62":2110,
    "64":2240,
    "66":2360,
    "68":2490,
    "70":2630,
    "72":2770,
    "74":2920,
    "76":3080,
    "78":3260,
    "80":3430,
    "82":3610,
    "84":3780,
    "86":3970,
    "88":4170,
    "90":4370,
    "92":4580,
    "94":4790,
    "96":5010,
    "98":5230,
    "100":5450
};

