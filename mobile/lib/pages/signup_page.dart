import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kidergarten/components/myButton.dart';
import 'package:kidergarten/components/textField.dart';
import 'package:kidergarten/pages/login_page.dart';
import 'package:kidergarten/pages/teacher.dart';
import 'package:kidergarten/pages/teacherDashboard.dart';
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
  String gender = "Male";
  String role = "teacher";

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final apiService = ApiService();
    final mediaQuery = MediaQuery.of(context);
    final screenHeight = mediaQuery.size.height;

    return GestureDetector(
      onTap: () =>
          FocusScope.of(context).unfocus(), // dismiss keyboard on tap outside
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color.fromARGB(255, 79, 41, 159),
                Color.fromARGB(255, 34, 162, 227)
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
          child: SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                child: Column(
                  children: [
                    Image.asset(
                      widget.isParent
                          ? 'assets/family_picture.png'
                          : 'assets/tableau.png',
                      scale: 1.5,
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      "Create an account",
                      style: TextStyle(
                        color: Color.fromARGB(255, 207, 207, 207),
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 20),

                    Form(
                      key: _formKey,
                      child: Column(
                        children: [
                          myTextField(
                            labelText: 'Name',
                            icon: Icons.person,
                            controller: fullNameController,
                          ),
                          const SizedBox(height: 10),
                          myTextField(
                            labelText: 'Email',
                            icon: Icons.email,
                            controller: emailController,
                          ),
                          const SizedBox(height: 10),
                          myTextField(
                            labelText: 'Phone',
                            icon: Icons.phone,
                            controller: phoneController,
                          ),
                          const SizedBox(height: 10),
                          myTextField(
                            isPassword: true,
                            labelText: 'Password',
                            icon: Icons.lock,
                            controller: passwordController,
                          ),
                          const SizedBox(height: 10),
                          myTextField(
                            isPassword: true,
                            labelText: 'Confirm Password',
                            icon: Icons.lock_outline,
                            controller: confirmPasswordController,
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 15),

                    // Gender Selection
                    buildToggleRow(
                      title: "Gender",
                      options: ["Male", "Female"],
                      selected: gender,
                      onSelected: (val) => setState(() => gender = val),
                    ),

                    const SizedBox(height: 10),

                    // Role Selection
                    buildToggleRow(
                      title: "Role",
                      options: ["teacher", "parent"],
                      selected: role,
                      onSelected: (val) => setState(() => role = val),
                    ),

                    const SizedBox(height: 30),

                    isLoading
                        ? const CircularProgressIndicator()
                        : myOutlinedButton(
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

                    const SizedBox(height: 20),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          "Already have an account? ",
                          style: TextStyle(
                              color: Color.fromARGB(255, 209, 209, 209),
                              fontSize: 16),
                        ),
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      const TeacherHomePage()),
                            );
                          },
                          child: const Text(
                            "Login",
                            style: TextStyle(
                              color: Colors.purple,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget buildToggleRow({
    required String title,
    required List<String> options,
    required String selected,
    required Function(String) onSelected,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Row(
        children: [
          Text(
            "$title:",
            style: const TextStyle(
              color: Color.fromARGB(255, 79, 41, 159),
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(width: 15),
          ...options.map((option) {
            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 5),
              child: ChoiceChip(
                label: Text(option[0].toUpperCase() + option.substring(1)),
                selected: selected == option,
                onSelected: (_) => onSelected(option),
                selectedColor: Colors.deepPurple,
                backgroundColor: Colors.blueGrey,
                labelStyle: const TextStyle(color: Colors.white),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }
}
