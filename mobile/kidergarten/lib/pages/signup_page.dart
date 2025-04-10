import 'package:flutter/material.dart';
import 'package:kidergarten/components/myButton.dart';
import 'package:kidergarten/components/textField.dart';
import 'package:kidergarten/pages/login_page.dart';
import 'package:kidergarten/services/api_service.dart';

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
  final TextEditingController phoneController = TextEditingController();

  bool isLoading = false;

  // Gender and Role values
  String gender = "Male";
  String role = "teacher";

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    final ApiService apiService = ApiService();

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
            ListView(
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
                SizedBox(height: screenHeight * .05),
                Center(
                  child: Text(
                    "Create an account",
                    style: TextStyle(
                      color: Color.fromARGB(255, 79, 41, 159),
                      fontSize: 35,
                    ),
                  ),
                ),
                SizedBox(height: screenHeight * .02),

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
                  labelText: 'Phone',
                  icon: Icons.phone,
                  controller: phoneController,
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
                SizedBox(height: screenHeight * .02),

                // Gender Toggle
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    children: [
                      Text(
                        "Gender:",
                        style: TextStyle(
                          color: Color.fromARGB(255, 79, 41, 159),
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(width: 20),
                      ChoiceChip(
                        label: Text(
                          "Male",
                          style: TextStyle(color: Colors.black),
                        ),
                        selected: gender == "Male",
                        onSelected: (_) {
                          setState(() {
                            gender = "Male";
                          });
                        },
                        selectedColor: Colors.deepPurple,
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                      SizedBox(width: 10),
                      ChoiceChip(
                        label: Text("Female"),
                        selected: gender == "Female",
                        onSelected: (_) {
                          setState(() {
                            gender = "Female";
                          });
                        },
                        selectedColor: Colors.purpleAccent,
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: screenHeight * .015),

                // Role Toggle
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25.0),
                  child: Row(
                    children: [
                      Text(
                        "Role:",
                        style: TextStyle(
                          color: Color.fromARGB(255, 79, 41, 159),
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(width: 20),
                      ChoiceChip(
                        label: Text("Teacher"),
                        selected: role == "teacher",
                        onSelected: (_) {
                          setState(() {
                            role = "teacher";
                          });
                        },
                        selectedColor: Colors.deepPurple,
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                      SizedBox(width: 10),
                      ChoiceChip(
                        label: Text("Parent"),
                        selected: role == "parent",
                        onSelected: (_) {
                          setState(() {
                            role = "parent";
                          });
                        },
                        selectedColor: Colors.purpleAccent,
                        labelStyle: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: screenHeight * .05),

                isLoading
                    ? CircularProgressIndicator()
                    : Padding(
                        padding: const EdgeInsets.fromLTRB(140, 0, 140, 0),
                        child: myOutlinedButton(
                          text: "Submit",
                          onTap: () async {
                            setState(() => isLoading = true);

                            await apiService.createUser(
                              fullNameController.text,
                              emailController.text,
                              passwordController.text,
                              confirmPasswordController.text,
                              role,
                              phoneController.text,
                              gender,
                            );

                            setState(() => isLoading = false);
                          },
                        ),
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
