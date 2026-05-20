# Feature Specification: Contact Form and Downloadable Resume

**Feature Branch**: `004-contact-resume`

**Created**: 2026-05-20

**Status**: Draft

**Input**: User description: "Functional contact form and downloadable resume."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Contact Form (Priority: P1)

As a recruiter, I can fill out a contact form with my name, email, subject, and message, and submit it.

**Why this priority**: Enabling communication is the primary goal of the contact page. Without this, the page fails its main purpose.

**Independent Test**: The form can be submitted and shows success/error states, even if email delivery is delayed or tested via mock/local setup.

**Acceptance Scenarios**:

1. **Given** an empty contact form, **When** the user attempts to submit, **Then** the submit button is disabled.
2. **Given** a contact form, **When** the user fills out name, valid email, subject, and message, **Then** the submit button becomes enabled.
3. **Given** a validly filled form, **When** the user submits it, **Then** a loading state is shown.
4. **Given** a successful submission, **When** the process completes, **Then** a "Message sent!" confirmation is shown and the form clears.
5. **Given** a failed submission, **When** an error occurs, **Then** a clear error message is shown to the user.

---

### User Story 2 - Receive Contact Submissions (Priority: P1)

As the owner, I receive contact form submissions via email with all the details.

**Why this priority**: Essential for the owner to actually receive the communications sent via the form.

**Independent Test**: Submitting a valid form should trigger an email to the owner's configured address within 1 minute.

**Acceptance Scenarios**:

1. **Given** a successful form submission, **When** the system processes it, **Then** an email is sent to the owner's configured email address.
2. **Given** the received email, **When** the owner views it, **Then** it contains the sender's name, email, subject, message, and timestamp.
3. **Given** the received email, **When** it arrives, **Then** the subject line is clearly formatted like "Portfolio Contact: [subject]".
4. **Given** a form submission, **When** processed successfully, **Then** the email arrives within 1 minute.

---

### User Story 3 - Download Resume PDF (Priority: P2)

As a visitor, I can download a PDF resume with an auto-generated "last updated" date.

**Why this priority**: Secondary to immediate contact, but highly valuable for recruiters who prefer offline documents.

**Independent Test**: The download button triggers a file download containing the correct content and dynamic date.

**Acceptance Scenarios**:

1. **Given** the contact page or header, **When** the user views it, **Then** a download button for the resume is visible.
2. **Given** the download button, **When** clicked, **Then** a PDF file named "Mohammed_Ben_Aoumeur_Resume.pdf" is downloaded.
3. **Given** the downloaded PDF, **When** opened, **Then** it contains the current CV content.
4. **Given** the downloaded PDF, **When** opened, **Then** it shows a "Last updated: [date]" reflecting the latest content change.

---

### User Story 4 - Spam Protection (Priority: P2)

As the owner, the site is protected from spam submissions via rate limiting.

**Why this priority**: Prevents abuse and overwhelming the owner's inbox.

**Independent Test**: Repeated submissions from the same IP are blocked after the threshold is reached.

**Acceptance Scenarios**:

1. **Given** a single IP address, **When** it attempts more than 3 submissions in an hour, **Then** further submissions are blocked.
2. **Given** a blocked submission attempt, **When** it occurs, **Then** a friendly rate limit error message ("Too many requests. Please try again in [X] minutes.") is shown.

### Edge Cases

- What happens when the user's internet connection drops during form submission?
- How does the experience respond when the email service provider is temporarily unavailable?
- What happens if the CV content has not been updated in a long time (how is the date formatted)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a contact form with required fields for name, email, subject, and message.
- **FR-002**: System MUST validate the email format before allowing submission.
- **FR-003**: System MUST provide visual feedback during submission (loading) and after completion (success/error).
- **FR-004**: System MUST clear the form fields upon successful submission.
- **FR-005**: System MUST send an email containing all submitted details and a timestamp to the owner's configured address within 1 minute.
- **FR-006**: System MUST format the email subject as "Portfolio Contact: [subject]".
- **FR-007**: System MUST provide a visible button to download the resume as a PDF.
- **FR-008**: System MUST name the downloaded file "Mohammed_Ben_Aoumeur_Resume.pdf".
- **FR-009**: System MUST ensure the downloaded PDF includes the current CV content and an auto-generated "Last updated" date.
- **FR-010**: System MUST rate-limit form submissions to a maximum of 3 per hour per IP address.
- **FR-011**: System MUST display a friendly error message including a retry timeframe when the rate limit is exceeded.
- **FR-012**: System MUST ensure the form is usable and responsive on mobile viewports.

### Key Entities

- **Contact Message**: Represents the payload submitted by the visitor, including name, email, subject, message body, and timestamp.
- **Resume Document**: Represents the generated or served PDF file containing the user's professional experience and a dynamic updated date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Contact form submissions successfully result in an email delivered to the owner's inbox 100% of the time in production environments.
- **SC-002**: Spam/automated submissions are reduced by rate limiting, with users limited to 3 submissions per hour.
- **SC-003**: The downloaded Resume PDF exactly matches the content of the online CV and correctly displays the date of the latest update.
- **SC-004**: The form is fully functional and visually stable on mobile viewports.
- **SC-005**: The portfolio site deploys successfully without errors related to the new features.

## Assumptions

- The target owner email address will be securely provided via environment variables.
- A functional email sending service/provider is available and configured for the production environment.
- The "latest content change" date for the resume can be determined from the content files or build process.
- Simple IP-based rate limiting is sufficient for the current threat model without requiring a CAPTCHA.
