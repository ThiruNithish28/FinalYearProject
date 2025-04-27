import * as Showdown from "showdown";
const convert =()=>{
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });
    return converter;
    }
export default convert;

