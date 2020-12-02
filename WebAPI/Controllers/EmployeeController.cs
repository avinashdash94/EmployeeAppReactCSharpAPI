using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"
                           Select EmployeeID, EmployeeName, Department, MailId, Convert(varchar(10), DOJ, 120) as DOJ
                           from dbo.Employees;
                           ";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"
                           Insert into dbo.Employees
                           (EmployeeName, Department, MailId, DOJ)
                           values(
                           '" + emp.EmployeeName + @"'
                           ,'" + emp.Department + @"'
                           ,'" + emp.MailId + @"'
                           ,'" + emp.DOJ + @"')
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
            catch(Exception ex)
            {
                return "Failed to Insert";
            }
        }

        public string Put(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"
                               Update dbo.Employees set
                               EmployeeName = '" + emp.EmployeeName + @"'
                               ,Department = '" + emp.Department + @"'
                               ,MailId = '" + emp.MailId + @"'
                               ,DOJ = '" + emp.DOJ + @"'
                               Where EmployeeID = " + emp.EmployeeID;
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
                               Delete from dbo.Employees
                               Where EmployeeID = " + id;
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

