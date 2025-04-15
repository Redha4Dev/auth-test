import 'package:flutter/material.dart';

class myTextField extends StatefulWidget {
  final String labelText;
  final IconData icon;
  final TextEditingController? controller;
  final bool isPassword;

  const myTextField({
    Key? key,
    required this.labelText,
    required this.icon,
    this.controller,
    this.isPassword = false,
  }) : super(key: key);

  @override
  State<myTextField> createState() => _myTextFieldState();
}

class _myTextFieldState extends State<myTextField> {
  late bool _obscure;

  @override
  void initState() {
    super.initState();
    _obscure = widget.isPassword;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(30, 10, 30, 0),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 15),
        decoration: BoxDecoration(
          border: Border.all(color: Color(0xFFAF92D8)),
          // boxShadow: [
          //   BoxShadow(
          //     color: Colors.black.withOpacity(0.2),
          //     spreadRadius: 1,
          //     blurRadius: 2,
          //     offset: Offset(0, 6),
          //   ),
          // ],
          color: Color.fromARGB(255, 235, 235, 235),
          borderRadius: BorderRadius.circular(30),
        ),
        child: Row(
          children: [
            Icon(widget.icon, color: Color(0xFFAF92D8)),
            SizedBox(width: 10),
            Expanded(
              child: TextFormField(
                controller: widget.controller,
                obscureText: _obscure,
                style: TextStyle(color: Colors.black),
                cursorColor: Color(0xFFAF92D8),
                decoration: InputDecoration(
                  labelText: widget.labelText,
                  labelStyle: TextStyle(color: Color(0xFFAF92D8)),
                  floatingLabelBehavior: FloatingLabelBehavior.auto,
                  border: InputBorder.none,
                ),
              ),
            ),
            if (widget.isPassword)
              GestureDetector(
                onTap: () {
                  setState(() {
                    _obscure = !_obscure;
                  });
                },
                child: Icon(
                  _obscure ? Icons.visibility_off : Icons.visibility,
                  color: Color(0xFFAF92D8),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
