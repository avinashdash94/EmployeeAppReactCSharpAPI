using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        //public IEnumerable<string> Get() //To get output in XML format
        public HttpResponseMessage Get()  // To get output in json format
        {
            //return new string[] { "value1", "value2" }; //To get output in XML format
            DataTable dt = new DataTable();
            dt.Columns.Add("DepId");
            dt.Columns.Add("DepName");

            dt.Rows.Add(1, "IT");
            dt.Rows.Add(1, "Support");

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
