provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "fa1_sg" {
  name = "fa1-security-group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "fa1_server" {
  ami                    = "ami-0f58b397bc5c1f2e8"
  instance_type          = "t3.micro"
  key_name               = "fa1-key-mohini"
  vpc_security_group_ids = [aws_security_group.fa1_sg.id]

  tags = {
    Name = "fa1-server"
  }
}