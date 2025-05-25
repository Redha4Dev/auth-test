import 'package:flutter/material.dart';
import 'package:kidergarten/components/my_button.dart';
import 'package:kidergarten/components/textField.dart';
import 'package:kidergarten/pages/navigator.dart';
import 'package:kidergarten/services/api_service.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final ApiService _apiService = ApiService();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width; // Gives the width
    double screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        width: screenWidth,
        decoration: BoxDecoration(
            gradient: LinearGradient(colors: [
          Color.fromARGB(255, 79, 41, 159),
          Color.fromARGB(255, 2 + 11 * 16, 10 * 16 + 2, 14 * 16 + 3)
        ], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
        child: Stack(
          alignment: Alignment.bottomCenter,
          children: [
            Container(
              height: screenHeight * .7,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(15),
                      topRight: Radius.circular(15))),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: screenHeight * .05,
                ),
                Image.asset(
                  "assets/tableau.png",
                  scale: 1,
                ),
                SizedBox(
                  height: screenHeight * .05,
                ),
                Text(
                  "Welcome Back",
                  style: TextStyle(
                      color: Color.fromARGB(255, 79, 41, 159), fontSize: 35),
                ),
                Text(
                  "Log into your account",
                  style: TextStyle(
                      color: Color.fromARGB(255, 139, 139, 139), fontSize: 15),
                ),
                SizedBox(
                  height: screenHeight * .01,
                ),
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      myTextField(
                        labelText: 'Email',
                        icon: Icons.email,
                        controller: _emailController,
                      ),
                      SizedBox(
                        height: screenHeight * .01,
                      ),
                      myTextField(
                          labelText: 'Password',
                          controller: _passwordController,
                          icon: Icons.password),
                    ],
                  ),
                ),
                SizedBox(
                  height: screenHeight * .05,
                ),
                myOutlinedButton(text: "Submit", onTap: _handleLogin),
                SizedBox(
                  height: screenHeight * .02,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Don't have an account? ",
                      style: TextStyle(
                        color: Colors.grey, // Grey text
                        fontSize: 18,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.pop(context);
                      },
                      child: Text(
                        "create one",
                        style: TextStyle(
                          color: Colors.purple, // Purple text
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      final response = await _apiService.loginUser(
        _emailController.text,
        _passwordController.text,
      );

      setState(() {
        _isLoading = false;
      });

      if (!mounted) return;

      if (response != null) {
        if (response['error'] == true) {
          // Show error message
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(response['message'] ?? 'Login failed'),
              backgroundColor: Colors.red,
            ),
          );
        } else if (response['token'] != null) {
          // Login successful
          final userData = await _apiService.getUserFromToken();
          if (userData != null) {
            final parentData = await _apiService.getParentInfo(
              userData['id'],
              userData['name'],
            );

            if (parentData != null) {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => const NavigationSpine(),
                ),
              );
            }
          }
        }
      } else {
        // Show generic error
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('An error occurred. Please try again.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}
