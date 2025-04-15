import 'package:flutter/material.dart';

class Mybutton extends StatefulWidget {
  final String title;
  final VoidCallback onTap;

  const Mybutton({super.key, required this.title, required this.onTap});

  @override
  State<Mybutton> createState() => _MybuttonState();
}

class _MybuttonState extends State<Mybutton> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
      child: GestureDetector(
        onTap: widget.onTap,
        child: Container(
          height: 50,
          width: 300,
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
            color: Color.fromARGB(255, 105, 73, 172),
            borderRadius: BorderRadius.all(Radius.circular(15)),
          ),
          child: Center(
              child: Text(
            widget.title,
            style: TextStyle(fontSize: 20, color: Colors.white),
          )),
        ),
      ),
    );
  }
}

class myOutlinedButton extends StatelessWidget {
  final String text;
  final VoidCallback onTap;

  const myOutlinedButton({required this.text, required this.onTap, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 100,
        height: 40,
        padding: EdgeInsets.symmetric(vertical: 0, horizontal: 0),
        decoration: BoxDecoration(
          // Purple border
          borderRadius: BorderRadius.circular(30), // Rounded edges
          color: const Color(0xFFAF92D8),
          boxShadow: [
            BoxShadow(
              color: Colors.black
                  .withOpacity(0.2), // Shadow color with transparency
              spreadRadius: 1, // How much the shadow spreads
              blurRadius: 2, // Softness of the shadow
              offset: Offset(0, 6), // Position: (X, Y)
            ),
          ], // Background color
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(
              color: const Color.fromARGB(255, 230, 230, 230), // Text color
              fontSize: 20,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }
}
