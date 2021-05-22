package com.example;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        User user = new User();
        user.setName("superfree");
        user.setPassword("12345678");
        System.out.println("User.name: " + user.getName());
        System.out.println("User.password: " + user.getPassword());
    }
}
