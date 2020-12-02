using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    //[EnableCors(origins: "https://localhost:44381", headers: "*", methods: "*")]

    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"
                            Select DepartmentID, DepartmentName
                            from dbo.Departments;
                           ";
            using(var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        
        public string Post(Department dep)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"
                           Insert into dbo.Departments 
                           values('" + dep.DepartmentName + @"')
                           ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Insert Successfully";
            }
            catch
            {
                return "Failed to Insert";
            }
        }

        public string Put(Department dep)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"
                           Update dbo.Departments set
                           DepartmentName = '" + dep.DepartmentName + @"'
                           where DepartmentID = " + dep.DepartmentID;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Update Successfully";
            }
            catch
            {
                return "Failed to Update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"
                               Delete from dbo.Departments
                               Where DepartmentID = " + id;
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted Successfully";
            }
            catch
            {
                return "Failed to Delete";
            }
        }
    }
}
