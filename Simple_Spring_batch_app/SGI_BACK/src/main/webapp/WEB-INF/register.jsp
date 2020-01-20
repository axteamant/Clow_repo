<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>User Form Page</title>
<style>
.error {
    color: #ff0000;
    font-weight: bold;
}
</style>
</head>
<body>
    <form:form method="POST" commandName="user" action="register">
        <table>
            <tr>
                <td>Email:</td>
                <td><form:input path="email" placeholder="Email"/></td>
                <td><form:errors path="email" cssClass="error" /></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><form:password path="password" placeholder="Password"/></td>
                <td><form:errors path="password" cssClass="error" /></td>
            </tr>
            <tr>
                <td>Age:</td>
                <td><form:input path="age" placeholder="Age"/></td>
                <td><form:errors path="age" cssClass="error" /></td>
            </tr>
            <tr>
                <td>Birthday:</td>
                <td><form:input path="birthday" placeholder="dd.MM.yyyy"/></td>
                <td><form:errors path="birthday" cssClass="error" /></td>
            </tr>
            <tr>
                <td colspan="3"><input type="submit" value="Register"></td>
            </tr>
        </table>

    </form:form>

</body>
</html>