data = {
    datasets: [{
        data: [10, 20, 30],
        
        backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B"],
        innerRadius: 9  ,
        animationEnabled: true,
        
            }],
            
    labels: [
        'Red',
        'Yellow',
        'Blue'
            ]} ,
            
        
            
 myPieChart = new Chart(ctx,{
    height : 50 ,
    type: 'doughnut',
    data: data,
    });


    data = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B"]
                }],
                
        labels: [
            'Red',
            'Yellow',
            'Blue'
                ]} ,
                
            
                
     myPieChart = new Chart(ctx1,{
        type: 'bar',
        data: data,
        });
    