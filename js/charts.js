var myCharts = echarts.init(document.getElementsByClassName('echartspie')[0]);
var option = {
    text: '本月累计业绩统计图',
    color: ['#fc9e4a', '#4c82ef', '#c470f0', '#3fd057'],
    radius: '100%',
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        itemWidth:30,
        right:20,
        bottom:30,
        data:[{name:'二手售',icon:'circle'},
            {name:'二手租',icon:'circle'},
            {name:'一手售',icon:'circle'},
            {name:'其他',icon:'circle'}]
    },
    series: [
        {
            name: '业绩统计',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    formatter: '{d}%',
                    position: 'inside'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:0, name:'二手售'},
                {value:310, name:'二手租'},
                {value:234, name:'一手售'},
                {value:0, name:'其他'}
            ]
        }
    ]
};
!function(){
    for (var n = 0; n < option.series[0].data.length; n++) {
        var ele = option.series[0].data[n];
        if(ele.value===0){
            option.series[0].data.splice(n,1);
            n--;
        }
    }
}();
// option.series[0].data.forEach(function(ele,index){
//     if(ele.value===0){
//         option.series[0].data.splice(index,1);
//     }
// });

console.log(option);

myCharts.setOption(option);
