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

  const myOutlinedButton({required this.text, required this.onTap, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.purple, width: 1.5), // Purple border
          borderRadius: BorderRadius.circular(30), // Rounded edges
          color: Colors.white, // Background color
        ),
        child: Text(
          text,
          style: TextStyle(
            color: Colors.purple, // Text color
            fontSize: 20,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
