import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:kidergarten/components/myButton.dart';
import 'package:kidergarten/components/textField.dart';
import 'package:kidergarten/pages/login_page.dart';

class SignupPage extends StatefulWidget {
  final bool isParent;

  const SignupPage({super.key, required this.isParent});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final TextEditingController fullNameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  bool isLoading = false; // To show loading state

  Future<void> signUpUser() async {
    final String apiUrl =
        'http://your-backend-url/api/v1/users/signup'; // Replace with your actual API URL

    final Map<String, dynamic> requestBody = {
      "name": fullNameController.text,
      "email": emailController.text,
      "password": passwordController.text,
      "confirmPassword": confirmPasswordController.text,
      "role": widget.isParent ? "parent" : "teacher",
      "kids": widget.isParent
          ? []
          : null, // Send kids list only if the user is a parent
    };

    try {
      setState(() {
        isLoading = true;
      });

      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEncode(requestBody),
      );

      final responseData = jsonDecode(response.body);

      if (response.statusCode == 201) {
        // Signup successful, handle the response
        print("Signup Successful! Token: ${responseData['token']}");

        // Navigate to login page or home
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
      } else {
        // Handle error
        print("Signup Failed: ${responseData['errr']}");
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(responseData['errr'] ?? "Signup failed")),
        );
      }
    } catch (e) {
      print("Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("An error occurred. Please try again.")),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        width: screenWidth,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromARGB(255, 79, 41, 159),
              Color.fromARGB(255, 34, 162, 227)
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Stack(
          alignment: Alignment.bottomCenter,
          children: [
            Container(
              height: screenHeight * .7,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(15),
                  topRight: Radius.circular(15),
                ),
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: screenHeight * .05),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      widget.isParent
                          ? 'assets/family_picture.png'
                          : 'assets/tableau.png',
                      scale: 1.5,
                    ),
                    SizedBox(width: screenWidth * .3),
                  ],
                ),
                SizedBox(height: screenHeight * .1),
                Text(
                  "Create an account",
                  style: TextStyle(
                    color: Color.fromARGB(255, 79, 41, 159),
                    fontSize: 35,
                  ),
                ),
                SizedBox(height: screenHeight * .05),
                myTextField(
                  labelText: 'Name',
                  icon: Icons.person,
                  controller: fullNameController,
                ),
                SizedBox(height: screenHeight * .01),
                myTextField(
                  labelText: 'Email',
                  icon: Icons.email,
                  controller: emailController,
                ),
                SizedBox(height: screenHeight * .01),
                myTextField(
                  labelText: 'Password',
                  icon: Icons.password,
                  controller: passwordController,
                ),
                SizedBox(height: screenHeight * .01),
                myTextField(
                  labelText: 'Confirm Password',
                  icon: Icons.password,
                  controller: confirmPasswordController,
                ),
                SizedBox(height: screenHeight * .12),
                isLoading
                    ? CircularProgressIndicator()
                    : myOutlinedButton(
                        text: "Submit",
                        onTap: signUpUser,
                      ),
                SizedBox(height: screenHeight * .02),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Already have an account? ",
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 18,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LoginPage(),
                          ),
                        );
                      },
                      child: Text(
                        "Login",
                        style: TextStyle(
                          color: Colors.purple,
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
}
