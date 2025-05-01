import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFF5E35B1),
        scaffoldBackgroundColor: Colors.white,
        fontFamily: 'Serif', // You might want to use a serif font to match the design
      ),
      home: const SettingsPage(),
    );
  }
}

// Common widgets
class LogoWidget extends StatelessWidget {
  const LogoWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 20, bottom: 10),
      child: CircleAvatar(
        radius: 20,
        backgroundColor: Colors.white,
        child: Text(
          'G',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: const Color(0xFF5E35B1),
          ),
        ),
      ),
    );
  }
}

class SectionTitle extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;

  const SectionTitle({
    Key? key,
    required this.title,
    required this.icon,
    this.color = const Color(0xFF5E35B1),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(width: 10),
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class NavigationItem extends StatelessWidget {
  final String title;
  final VoidCallback onTap;
  final bool showChevron;
  final bool expanded;

  const NavigationItem({
    Key? key,
    required this.title,
    required this.onTap,
    this.showChevron = true,
    this.expanded = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
            if (showChevron)
              Icon(
                expanded ? Icons.keyboard_arrow_down : Icons.chevron_right,
                color: Colors.grey,
                size: 20,
              ),
          ],
        ),
      ),
    );
  }
}

class IllustrationWidget extends StatelessWidget {
  const IllustrationWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 20),
      width: 150,
      height: 100,
      decoration: BoxDecoration(
        color: const Color(0xFF5E35B1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Center(
        child: Image.asset(
          'assets/reading_illustration.png', // You'll need to add this asset
          width: 100,
          height: 80,
          fit: BoxFit.contain,
          // If you don't have the exact illustration, you can use a placeholder:
          errorBuilder: (context, error, stackTrace) {
            return Icon(
              Icons.person,
              size: 60,
              color: Colors.white.withOpacity(0.7),
            );
          },
        ),
      ),
    );
  }
}

class LogoutButton extends StatelessWidget {
  final VoidCallback onTap;

  const LogoutButton({
    Key? key,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF5E35B1), width: 2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(
              Icons.logout,
              color: Color(0xFF5E35B1),
              size: 20,
            ),
          ),
          const SizedBox(width: 8),
          const Text(
            'Logout',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Color(0xFF5E35B1),
            ),
          ),
        ],
      ),
    );
  }
}

class NotificationToggle extends StatefulWidget {
  final bool initialValue;
  final Function(bool) onChanged;

  const NotificationToggle({
    Key? key,
    required this.initialValue,
    required this.onChanged,
  }) : super(key: key);

  @override
  State<NotificationToggle> createState() => _NotificationToggleState();
}

class _NotificationToggleState extends State<NotificationToggle> {
  late bool isOn;

  @override
  void initState() {
    super.initState();
    isOn = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            const Text(
              'Notification ',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
            Text(
              isOn ? 'on' : 'off',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: isOn ? Colors.green : Colors.red,
              ),
            ),
          ],
        ),
        Switch(
          value: isOn,
          onChanged: (value) {
            setState(() {
              isOn = value;
            });
            widget.onChanged(value);
          },
          activeTrackColor: Colors.grey.shade300,
          activeColor: Colors.grey,
        ),
      ],
    );
  }
}

class InputField extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isPassword;
  final TextEditingController controller;

  const InputField({
    Key? key,
    required this.label,
    required this.icon,
    this.isPassword = false,
    required this.controller,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFFB39DDB),
        borderRadius: BorderRadius.circular(25),
      ),
      child: TextField(
        controller: controller,
        obscureText: isPassword,
        decoration: InputDecoration(
          icon: Icon(icon, color: Colors.white),
          border: InputBorder.none,
          hintText: label,
          hintStyle: const TextStyle(color: Colors.white),
        ),
        style: const TextStyle(color: Colors.white),
      ),
    );
  }
}

// Main Settings Page with Accordion Behavior
class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool notificationsEnabled = false;
  bool isEditProfileExpanded = false;
  bool isChangePasswordExpanded = false;
  
  // Controllers for edit profile
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  
  // Controllers for change password
  final TextEditingController oldPasswordController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    oldPasswordController.dispose();
    newPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Logo
                const Center(child: LogoWidget()),
                
                // Settings Title
                const Text(
                  'Settings',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                
                const SizedBox(height: 20),
                
                // Account Section
                const SectionTitle(
                  title: 'Account',
                  icon: Icons.person_outline,
                ),
                const Divider(height: 1),
                
                // Edit Profile Section with Accordion
                NavigationItem(
                  title: 'Edit profile',
                  expanded: isEditProfileExpanded,
                  onTap: () {
                    setState(() {
                      isEditProfileExpanded = !isEditProfileExpanded;
                      if (isEditProfileExpanded) {
                        isChangePasswordExpanded = false;
                      }
                    });
                  },
                ),
                
                // Edit Profile Fields (Expanded Content)
                if (isEditProfileExpanded) ...[
                  InputField(
                    label: 'Change Name:',
                    icon: Icons.person,
                    controller: nameController,
                  ),
                  
                  InputField(
                    label: 'Change Email:',
                    icon: Icons.email,
                    controller: emailController,
                  ),
                  
                  InputField(
                    label: 'Change Phone Number:',
                    icon: Icons.phone,
                    controller: phoneController,
                  ),
                ],
                
                // Change Password Section with Accordion
                NavigationItem(
                  title: 'Change password',
                  expanded: isChangePasswordExpanded,
                  onTap: () {
                    setState(() {
                      isChangePasswordExpanded = !isChangePasswordExpanded;
                      if (isChangePasswordExpanded) {
                        isEditProfileExpanded = false;
                      }
                    });
                  },
                ),
                
                // Change Password Fields (Expanded Content)
                if (isChangePasswordExpanded) ...[
                  InputField(
                    label: 'Old Password:',
                    icon: Icons.lock_outline,
                    isPassword: true,
                    controller: oldPasswordController,
                  ),
                  
                  InputField(
                    label: 'New password:',
                    icon: Icons.lock_outline,
                    isPassword: true,
                    controller: newPasswordController,
                  ),
                ],
                
                const SizedBox(height: 10),
                
                // Notifications Section
                const SectionTitle(
                  title: 'Notifications',
                  icon: Icons.notifications_none,
                ),
                const Divider(height: 1),
                
                NotificationToggle(
                  initialValue: notificationsEnabled,
                  onChanged: (value) {
                    setState(() {
                      notificationsEnabled = value;
                    });
                  },
                ),
                
                const SizedBox(height: 10),
                
                // More Section
                const SectionTitle(
                  title: 'More',
                  icon: Icons.menu,
                ),
                const Divider(height: 1),
                
                NavigationItem(
                  title: 'Language',
                  onTap: () {
                    // Handle language settings
                  },
                ),
                
                NavigationItem(
                  title: 'About us',
                  onTap: () {
                    // Handle about us
                  },
                ),
                
                // Illustration
                const Center(child: IllustrationWidget()),
                
                // Logout Button
                Center(
                  child: LogoutButton(
                    onTap: () {
                      // Handle logout
                    },
                  ),
                ),
                
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}