const {c, cpp, node, python, java} = require('compile-run');
const compiler = ` 

void main()
{
    int i=0;
    for(i=0;i<5;i++)
        printf("hello varma");
}
`; 

c.runSource(compiler).then(res=>{
    console.log(res.stdout);
});