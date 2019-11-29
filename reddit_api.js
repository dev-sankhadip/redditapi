export default{
    search:function(){

        const term=arguments[0];
        const limit=arguments[1];
        const sort=arguments[2];
        
        return fetch(`http://www.reddit.com/search.json?q=${term}&sort=${sort}&limit=${limit}`)
        .then((res)=>{
            return res.json();
        }).then((res)=>{
            return res.data.children.map(data=> data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
}