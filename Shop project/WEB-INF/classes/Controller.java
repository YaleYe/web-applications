import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.ArrayList;

/**
 * Controller servlet for simple shopping app.
 */
// NOTE: No need for @WebServlet; handled by web.xml
public class Controller extends HttpServlet
{ 
    /**
     * Determine the type of client request and process it accordingly.
     */
    // NOTE: doGet() only
    public void doGet (HttpServletRequest request,
                       HttpServletResponse response) 
	throws ServletException, IOException
    {
	// NOTE: No need to do anything related to HTTP headers or
	// HTML generation

	// NOTE: Use getPathInfo()
	ServletContext application = getServletContext();
	HttpSession session = request.getSession();
	String pathInfo = request.getPathInfo();

	// If new session, bare URL, or explicit login, display the login page.
	if (session.isNew() || pathInfo == null || pathInfo.equals("/") ||
	    pathInfo.equalsIgnoreCase("/login")) {
	    application.getNamedDispatcher("login").forward(request,response);
	}
	// If returning from login page, store the user name and an empty
	// cart in session.  Initialize the user's orders if no prior orders.
	// Then shop.
	else if (pathInfo.equalsIgnoreCase("/end_login")) {
	    String username = (String)request.getParameter("username");
	    session.setAttribute("username", username);
	    session.setAttribute("cart", new ArrayList<String>());
	    ArrayList<ArrayList<String>> orders =
		(ArrayList<ArrayList<String>>)application.getAttribute(username);
	    if (orders == null) {
		orders = new ArrayList<ArrayList<String>>();
		application.setAttribute(username, orders);
	    }
	    application.getNamedDispatcher("shop").forward(request,response);
	}
	// If adding item to cart, do so and shop some more.
	else if (pathInfo.equalsIgnoreCase("/add_to_cart")) {
	    ArrayList<String> cart = (ArrayList<String>)session.getAttribute("cart");
	    String item = request.getParameter("item");
	    cart.add(item);
	    application.getNamedDispatcher("shop").forward(request,response);
	}
	// If placing an order, do so, clear the cart, and shop some more.
	else if (pathInfo.equalsIgnoreCase("/place_order")) {
	    String username = (String)session.getAttribute("username");
	    ArrayList<ArrayList<String>> orders =
		(ArrayList<ArrayList<String>>)application.getAttribute(username);
	    ArrayList<String> cart = (ArrayList<String>)session.getAttribute("cart");
	    orders.add(cart);
	    session.setAttribute("cart", new ArrayList<String>());
	    application.getNamedDispatcher("shop").forward(request,response);
	}
	// If asked to display orders, do so
	else if (pathInfo.equalsIgnoreCase("/display_orders")) {
	    String username = (String)session.getAttribute("username");
	    ArrayList<ArrayList<String>> orders =
		(ArrayList<ArrayList<String>>)application.getAttribute(username);
	    request.setAttribute("orders", orders);
	    application.getNamedDispatcher("orders").forward(request,response);
	}
	// Continue shopping (after display of previous orders)
	else if (pathInfo.equalsIgnoreCase("/continue_shopping")) {
	    application.getNamedDispatcher("shop").forward(request,response);
	}
	else {
	    // Should generate an error page. For now, just log the
	    // unrecognized pathInfo and send user to login page.
	    application.log("Invalid path: " + pathInfo);
	    application.getNamedDispatcher("login").forward(request,response);
	}
    }
}
