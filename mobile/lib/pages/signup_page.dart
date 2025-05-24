import 'package:flutter/material.dart';
import 'package:kidergarten/components/my_button.dart';
import 'package:kidergarten/components/textField.dart';
import 'package:kidergarten/pages/login_page.dart';
import 'package:kidergarten/pages/verification.dart';
import 'package:kidergarten/services/api_service.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

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

  final TextEditingController schoolController = TextEditingController();

  bool isLoading = false;
  String gender = "Male";
  String role = "teacher";

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final apiService = ApiService();

    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        resizeToAvoidBottomInset: true,
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
            child: Column(
              children: [
                const SizedBox(height: 10),
                Image.asset(
                  'assets/family_picture.png',
                  scale: 1.5,
                ),
                const SizedBox(height: 10),
                Expanded(
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(15),
                        topRight: Radius.circular(15),
                      ),
                    ),
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        return SingleChildScrollView(
                          padding: EdgeInsets.only(
                            bottom:
                                MediaQuery.of(context).viewInsets.bottom + 20,
                            top: 20,
                            left: 20,
                            right: 20,
                          ),
                          child: ConstrainedBox(
                            constraints: BoxConstraints(
                              minHeight: constraints.maxHeight,
                            ),
                            child: IntrinsicHeight(
                              child: Column(
                                children: [
                                  const Text(
                                    "Create an account",
                                    style: TextStyle(
                                      color: Color.fromARGB(255, 89, 57, 158),
                                      fontSize: 32,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 16),
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
                                          labelText: 'School',
                                          icon: Icons.school,
                                          controller: schoolController,
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
                                  const SizedBox(height: 16),
                                  Row(
                                    children: [
                                      Expanded(
                                        child: buildToggleRow(
                                          options: ["Male", "Female"],
                                          selected: gender,
                                          onSelected: (val) =>
                                              setState(() => gender = val),
                                        ),
                                      ),
                                      const SizedBox(width: 16),
                                      Expanded(
                                        child: buildToggleRow(
                                          options: ["teacher", "parent"],
                                          selected: role,
                                          onSelected: (val) =>
                                              setState(() => role = val),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 20),
                                  isLoading
                                      ? const CircularProgressIndicator()
                                      : myOutlinedButton(
                                          text: "Submit",
                                          onTap: () async {
                                            print("📩 Submit button tapped");
                                            setState(() => isLoading = true);
                                            try {
                                              // Step 1: Call createUser (which saves token in SharedPreferences)
                                              await apiService.createUser(
                                                name: 'ESI',
                                                email: 'zadrojagne@gufum.com',
                                                phone: '02222222',
                                                role: 'teacher',
                                                gender: 'Male',
                                                password: 'qwerty1',
                                                confirmPassword: 'qwerty1',
                                                school: 'ilyestest1234',
                                                kids: [],
                                                address: 'sba',
                                              );

                                              // Step 2: Extract user ID from token
                                              final userData = await apiService
                                                  .getUserFromToken();

                                              setState(() => isLoading = false);

                                              if (userData != null &&
                                                  userData['id'] != null) {
                                                final userId = userData['id'];
                                                print(
                                                    "✅ Extracted user ID from token: $userId");

                                                // Step 3: Navigate to verification screen
                                                Navigator.pushReplacement(
                                                  context,
                                                  MaterialPageRoute(
                                                    builder: (context) =>
                                                        VerifyCodePage(
                                                            userId: userId),
                                                  ),
                                                );
                                              } else {
                                                print(
                                                    "❌ Could not extract user ID from token");
                                                ScaffoldMessenger.of(context)
                                                    .showSnackBar(
                                                  const SnackBar(
                                                      content: Text(
                                                          "Signup succeeded, but verification failed.")),
                                                );
                                              }
                                            } catch (e) {
                                              print(
                                                  "🔥 Error during signup: $e");
                                              setState(() => isLoading = false);
                                              ScaffoldMessenger.of(context)
                                                  .showSnackBar(
                                                SnackBar(
                                                    content: Text("Error: $e")),
                                              );
                                            }
                                          }),
                                  const SizedBox(height: 20),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Text(
                                        "Already have an account? ",
                                        style: TextStyle(
                                            color: Colors.grey, fontSize: 16),
                                      ),
                                      GestureDetector(
                                        onTap: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) =>
                                                    const LoginPage()),
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
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget buildToggleRow({
    required List<String> options,
    required String selected,
    required Function(String) onSelected,
  }) {
    return Wrap(
      spacing: 6,
      children: options.map((option) {
        return ChoiceChip(
          showCheckmark: false,
          label: Text(option[0].toUpperCase() + option.substring(1)),
          selected: selected == option,
          onSelected: (_) => onSelected(option),
          selectedColor: Colors.deepPurple,
          backgroundColor: Colors.blueGrey,
          labelStyle: const TextStyle(color: Colors.white),
        );
      }).toList(),
    );
  }
}
