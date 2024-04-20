using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

public partial class Default : System.Web.UI.Page
{
    string name, mob, mail1;
    string description = null;
    string constr = ConfigurationManager.ConnectionStrings["popupconnection"].ToString();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

        }
    }


    protected void btnsubmit_Serverclick(object sender, EventArgs e)
    {
        
            DataTable dt = new DataTable();
            try
            {

                name = txtName.Text;
                mail1 = txtEmailId.Text;
                mob = txtMobile.Text;
                SqlConnection con = new SqlConnection(constr);
                SqlCommand cmd = new SqlCommand();

                cmd.Connection = con;
                cmd.CommandText = "Insert_lead";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Name", txtName.Text);
                cmd.Parameters.Add("@PhoneNo", txtMobile.Text);
                cmd.Parameters.Add("@EmailId", txtEmailId.Text);
                cmd.Parameters.Add("@CreatedOn", System.DateTime.Now);
                cmd.Parameters.Add("@CreatedBy", "Admin");
                cmd.Parameters.Add("@City", "NA");
                cmd.Parameters.Add("@Address", "{{TITLE}}");
                cmd.Parameters.Add("@WebsiteName", "{{TITLE}}");
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(dt);
            
                txtEmailId.Text = txtName.Text = txtMobile.Text = "";
                Response.Redirect("thankyou.htm");
            }
            catch (Exception ee)
            {
                ErrHandler.WriteError(ee.Message);
            }
    }

    protected void sumclick(object sender, EventArgs e)
    {
            DataTable dt = new DataTable();
            try
            {
                SqlConnection con = new SqlConnection(constr);
                SqlCommand cmd = new SqlCommand();

                cmd.Connection = con;
                cmd.CommandText = "Insert_lead";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add("@Name", modalName.Text);
                cmd.Parameters.Add("@PhoneNo", modalMobile.Text);
                cmd.Parameters.Add("@EmailId", modaMail.Text);
                cmd.Parameters.Add("@CreatedOn", System.DateTime.Now);
                cmd.Parameters.Add("@CreatedBy", "Admin");
                cmd.Parameters.Add("@City", "NA");
                cmd.Parameters.Add("@Address", "{{TITLE}}");
                cmd.Parameters.Add("@WebsiteName", "{{TITLE}}");
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;
                da.Fill(dt);
                modalName.Text = modaMail.Text = modalMobile.Text = "";
                Response.Redirect("thankyou.htm");
            }
            catch (Exception ee)
            {
                ErrHandler.WriteError(ee.Message);
            }
        
    }

   
}

