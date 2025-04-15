import 'package:flutter/material.dart';
import 'package:kidergarten/components/myButton.dart';
import 'package:kidergarten/global.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: myOutlinedButton(
            text: "Logout",
            onTap: () {
              Navigator.pop(context);
              globalParentData = null;
            }));
  }
}
