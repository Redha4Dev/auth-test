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
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 6),
            ),
          ],
          color: Color(0xFFAF92D8),
          borderRadius: BorderRadius.circular(30),
        ),
        child: Row(
          children: [
            Icon(widget.icon, color: Colors.white),
            SizedBox(width: 10),
            Expanded(
              child: TextFormField(
                controller: widget.controller,
                obscureText: _obscure,
                style: TextStyle(color: Colors.white),
                cursorColor: Colors.white,
                decoration: InputDecoration(
                  labelText: widget.labelText,
                  labelStyle: TextStyle(color: Colors.white70),
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
                  color: Colors.white,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
