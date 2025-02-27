import 'package:flutter/material.dart';

class myTextField extends StatelessWidget {
  final String labelText;
  final IconData icon;
  final TextEditingController? controller;
  final bool isPassword;

  const myTextField({
    Key? key,
    required this.labelText, // Label text as input
    required this.icon, // Icon as input
    this.controller,
    this.isPassword = false, // To handle password fields
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 15),
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black
                  .withOpacity(0.2), // Shadow color with transparency
              spreadRadius: 1, // How much the shadow spreads
              blurRadius: 2, // Softness of the shadow
              offset: Offset(0, 6), // Position: (X, Y)
            ),
          ],
          color: Color(0xFFAF92D8), // Light purple background
          borderRadius: BorderRadius.circular(30), // Rounded corners
        ),
        child: Row(
          children: [
            Icon(icon, color: Colors.white), // Dynamic icon
            SizedBox(width: 10), // Space between icon and text

            SizedBox(width: 10), // Space before TextField
            Expanded(
              child: TextField(
                controller: controller,
                obscureText: isPassword, // For password fields
                decoration: InputDecoration(
                  border: InputBorder.none, // No underline
                  hintText: labelText,
                  hintStyle: TextStyle(color: Colors.white70),
                ),
                style: TextStyle(color: Colors.white),
                cursorColor: Colors.white, // Cursor color
              ),
            ),
          ],
        ),
      ),
    );
  }
}
