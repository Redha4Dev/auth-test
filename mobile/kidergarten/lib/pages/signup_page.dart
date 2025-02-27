import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kidergarten/components/myButton.dart';
import 'package:kidergarten/components/textField.dart';
import 'package:kidergarten/pages/login_page.dart';

class SignupPage extends StatefulWidget {
  final bool isParent; // Store the isParent parameter

  const SignupPage({super.key, required this.isParent});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final TextEditingController fullNameController = TextEditingController();

  final TextEditingController emailController = TextEditingController();

  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width; // Gives the width
    double screenHeight =
        MediaQuery.of(context).size.height; // Gives the height

    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        width: screenWidth,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromARGB(255, 79, 41, 159),
              Color.fromARGB(255, 2 + 11 * 16, 10 * 16 + 2, 14 * 16 + 3)
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

                // Image Section
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

                // Title
                Text(
                  "Create an account",
                  style: TextStyle(
                    color: Color.fromARGB(255, 79, 41, 159),
                    fontSize: 35,
                  ),
                ),

                SizedBox(height: screenHeight * .05),

                // Input Fields
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

                SizedBox(height: screenHeight * .2),

                // Submit Button
                myOutlinedButton(
                    text: "Submit",
                    onTap: () {
                      print(fullNameController.text);
                      print(emailController.text);
                      print(passwordController.text);
                    }),

                SizedBox(height: screenHeight * .02),

                // Login Text
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Already have an account? ",
                      style: TextStyle(
                        color: Colors.grey, // Grey text
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
}
